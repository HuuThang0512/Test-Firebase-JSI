// dashboard.js - Trang dashboard đơn giản
import { userSession } from "./userSession.js"
import { checkLogin, setupLogoutButton } from "./logout.js"

// Kiểm tra đăng nhập khi load trang
document.addEventListener("DOMContentLoaded", () => {
  if (!checkLogin()) return

  displayUserDetails()
  setupLogoutButton()
  addFoodMenuButton()
})

function displayUserDetails() {
  const user = userSession.getCurrentUser()

  if (user) {
    const userInfoDiv = document.querySelector(".user-info")
    if (userInfoDiv) {
      userInfoDiv.innerHTML = `
        <div style="margin-bottom: 20px; color: white;">
          <h3>Thông tin tài khoản:</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Vai trò:</strong> ${
            user.role_id === 1 ? "Admin" : "User"
          }</p>
          <p><strong>Thời gian đăng nhập:</strong> ${new Date(
            user.loginTime,
          ).toLocaleString("vi-VN")}</p>
        </div>
      `
    }
  }
}

function addFoodMenuButton() {
  const linkContainer = document.querySelector(".home-link-container")
  if (linkContainer) {
    // Add food menu button before logout button
    const foodMenuBtn = document.createElement("button")
    foodMenuBtn.className = "auth-btn"
    foodMenuBtn.style.margin = "5px"
    foodMenuBtn.textContent = "🍽️ Xem Menu"
    foodMenuBtn.onclick = () => (window.location.href = "foods.html")

    linkContainer.insertBefore(foodMenuBtn, linkContainer.firstChild)
  }
}
