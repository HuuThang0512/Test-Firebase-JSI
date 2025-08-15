// addFood.js - Xử lý thêm món ăn
import { checkLogin, checkAdmin } from "./logout.js"
import { addFood } from "./firebase/foods.js"

// Kiểm tra quyền admin
document.addEventListener("DOMContentLoaded", () => {
  if (!checkLogin()) return
  if (!checkAdmin()) return

  setupForm()
})

function setupForm() {
  const form = document.getElementById("food-form")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const submitBtn = form.querySelector('button[type="submit"]')

    // Disable button
    submitBtn.disabled = true
    submitBtn.textContent = "Đang thêm..."

    try {
      const foodData = {
        name: formData.get("name").trim(),
        description: formData.get("description").trim(),
        price: parseInt(formData.get("price")),
        category: formData.get("category").trim() || "Khác",
        imageUrl: formData.get("imageUrl").trim() || "",
        cookingTime: parseInt(formData.get("cookingTime")) || 0,
        isSpicy: formData.get("isSpicy") === "on",
        isVegetarian: formData.get("isVegetarian") === "on",
      }

      // Validate
      if (!foodData.name || foodData.price <= 0) {
        throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc")
      }

      // Add to database
      const result = await addFood(foodData)

      alert(`Thêm món ăn "${foodData.name}" thành công!`)
      form.reset()
    } catch (error) {
      console.error("Lỗi thêm món ăn:", error)
      alert(`Lỗi: ${error.message}`)
    } finally {
      // Re-enable button
      submitBtn.disabled = false
      submitBtn.textContent = "Thêm Món Ăn"
    }
  })
}
