// manageFoods.js - Quản lý danh sách món ăn
import { checkLogin, checkAdmin } from "./logout.js"
import { getAllFoods, deleteFood, updateFood } from "./firebase/foods.js"

// Kiểm tra quyền admin
document.addEventListener("DOMContentLoaded", () => {
  if (!checkLogin()) return
  if (!checkAdmin()) return

  loadFoods()
})

// Load danh sách món ăn
window.loadFoods = async function () {
  const loading = document.getElementById("loading")
  const foodsContainer = document.getElementById("foods-container")
  const noFoods = document.getElementById("no-foods")

  // Show loading
  loading.style.display = "block"
  foodsContainer.style.display = "none"
  noFoods.style.display = "none"

  try {
    const foods = await getAllFoods()

    loading.style.display = "none"

    if (foods.length === 0) {
      noFoods.style.display = "block"
      return
    }

    displayFoods(foods)
    foodsContainer.style.display = "block"
  } catch (error) {
    console.error("Lỗi tải món ăn:", error)
    loading.innerHTML = "Lỗi tải dữ liệu. Vui lòng thử lại!"
  }
}

function displayFoods(foods) {
  const foodsCount = document.getElementById("foods-count")
  const foodsTbody = document.getElementById("foods-tbody")

  foodsCount.textContent = `Tổng cộng: ${foods.length} món ăn`

  foodsTbody.innerHTML = foods.map((food) => createFoodRow(food)).join("")

  // Setup action buttons
  setupActionButtons()
}

function createFoodRow(food) {
  return `
    <tr>
      <td>
        ${
          food.imageUrl
            ? `<img src="${food.imageUrl}" alt="${food.name}" class="food-image" onerror="this.style.display='none'">`
            : '<div style="width:60px;height:60px;background:#666;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:20px;">🍽️</div>'
        }
      </td>
      <td>
        <strong>${food.name}</strong>
        ${
          food.description
            ? `<br><small style="opacity:0.8;">${food.description}</small>`
            : ""
        }
      </td>
      <td>${food.price.toLocaleString("vi-VN")} VNĐ</td>
      <td>${food.category || "Khác"}</td>
      <td>
        <span class="${food.isActive ? "status-active" : "status-inactive"}">
          ${food.isActive ? "✅ Hoạt động" : "❌ Tạm ngưng"}
        </span>
      </td>
      <td>
        <button class="action-btn edit-btn" onclick="toggleStatus('${
          food.id
        }', ${!food.isActive})">
          ${food.isActive ? "⏸️ Tạm ngưng" : "▶️ Kích hoạt"}
        </button>
        <button class="action-btn delete-btn" onclick="deleteFood('${
          food.id
        }', '${food.name}')">
          🗑️ Xóa
        </button>
      </td>
    </tr>
  `
}

function setupActionButtons() {
  // Global functions for buttons
  window.toggleStatus = async function (foodId, newStatus) {
    try {
      await updateFood(foodId, { isActive: newStatus })
      alert(`${newStatus ? "Kích hoạt" : "Tạm ngưng"} món ăn thành công!`)
      loadFoods() // Reload
    } catch (error) {
      alert(`Lỗi: ${error.message}`)
    }
  }

  window.deleteFood = async function (foodId, foodName) {
    if (
      !confirm(
        `Bạn có chắc muốn xóa món "${foodName}"?\nMón ăn sẽ bị ẩn khỏi menu.`,
      )
    ) {
      return
    }

    try {
      await deleteFood(foodId)
      alert(`Đã xóa món "${foodName}" thành công!`)
      loadFoods() // Reload
    } catch (error) {
      alert(`Lỗi xóa món ăn: ${error.message}`)
    }
  }
}
