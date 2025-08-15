// foods.js - Hiển thị danh sách món ăn cho khách hàng
import { getActiveFoods } from "./firebase/foods.js"

document.addEventListener("DOMContentLoaded", () => {
  loadFoods()
})

async function loadFoods() {
  const loading = document.getElementById("loading")
  const foodsGrid = document.getElementById("foods-grid")
  const noFoods = document.getElementById("no-foods")

  try {
    const foods = await getActiveFoods()

    loading.style.display = "none"

    if (foods.length === 0) {
      noFoods.style.display = "block"
      return
    }

    displayFoods(foods)
    foodsGrid.style.display = "grid"
  } catch (error) {
    console.error("Lỗi tải món ăn:", error)
    loading.textContent = "Lỗi tải dữ liệu. Vui lòng thử lại!"
  }
}

function displayFoods(foods) {
  const foodsGrid = document.getElementById("foods-grid")

  foodsGrid.innerHTML = foods.map((food) => createFoodCard(food)).join("")

  // Setup order buttons
  setupOrderButtons()
}

function createFoodCard(food) {
  const tags = []
  if (food.isSpicy) tags.push("🌶️ Cay")
  if (food.isVegetarian) tags.push("🌱 Chay")
  if (food.cookingTime) tags.push(`⏱️ ${food.cookingTime} phút`)

  return `
    <div class="food-card">
      ${
        food.imageUrl
          ? `<img src="${food.imageUrl}" alt="${food.name}" class="food-image" onerror="this.style.display='none'">`
          : ""
      }
      
      <div class="food-name">${food.name}</div>
      
      ${
        food.category ? `<div class="food-category">${food.category}</div>` : ""
      }
      
      ${
        food.description
          ? `<p style="margin: 10px 0; font-size: 0.9rem; opacity: 0.9;">${food.description}</p>`
          : ""
      }
      
      <div class="food-tags">
        ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      
      <div class="food-price">${food.price.toLocaleString("vi-VN")} VNĐ</div>
      
      <button class="order-btn" data-food-id="${food.id}" data-food-name="${
    food.name
  }" data-food-price="${food.price}">
        🛒 Đặt Món
      </button>
    </div>
  `
}

function setupOrderButtons() {
  const orderBtns = document.querySelectorAll(".order-btn")

  orderBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const foodId = btn.dataset.foodId
      const foodName = btn.dataset.foodName
      const foodPrice = btn.dataset.foodPrice

      // Simple order simulation
      if (
        confirm(
          `Đặt món "${foodName}" với giá ${parseInt(foodPrice).toLocaleString(
            "vi-VN",
          )} VNĐ?`,
        )
      ) {
        alert(
          `Đã thêm "${foodName}" vào giỏ hàng!\n(Chức năng giỏ hàng đang phát triển)`,
        )
      }
    })
  })
}
