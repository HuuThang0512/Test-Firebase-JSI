// admin.js - Quản lý trang admin đơn giản
import { userSession } from "./userSession.js"
import { checkLogin, checkAdmin, setupLogoutButton } from "./logout.js"

// Kiểm tra quyền admin khi load trang
document.addEventListener("DOMContentLoaded", () => {
  if (!checkLogin()) return
  if (!checkAdmin()) return

  displayAdminDetails()
  setupLogoutButton("Bạn có chắc chắn muốn đăng xuất khỏi Admin Panel?")
  setupAdminActions()
})

function displayAdminDetails() {
  const user = userSession.getCurrentUser()

  if (user) {
    const userInfoDiv = document.querySelector(".user-info")
    if (userInfoDiv) {
      userInfoDiv.innerHTML = `
        <div style="margin-bottom: 20px; color: white;">
          <h3>🔑 Thông tin Admin:</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Vai trò:</strong> 👑 Administrator</p>
          <p><strong>Thời gian đăng nhập:</strong> ${new Date(
            user.loginTime,
          ).toLocaleString("vi-VN")}</p>
        </div>
      `
    }
  }
}

function setupAdminActions() {
  const adminActions = document.querySelector(".admin-actions")
  if (adminActions) {
    adminActions.innerHTML = `
      <button class="auth-btn" style="margin: 5px;" onclick="window.location.href='add-food.html'">➕ Thêm Món Ăn</button>
      <button class="auth-btn" style="margin: 5px;" onclick="window.location.href='manage-foods.html'">📋 Quản lý Món Ăn</button>
      <button class="auth-btn" style="margin: 5px;" onclick="window.location.href='orders.html'">📦 Quản lý Đơn Hàng</button>
    `
  }
}
