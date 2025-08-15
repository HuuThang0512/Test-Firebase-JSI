import { signOutUser } from "./firebase/auth.js"
import { userSession } from "./userSession.js"

// Hàm logout chung
export async function logout() {
  try {
    await signOutUser()
    alert("Đăng xuất thành công!")
    window.location.href = "login.html"
  } catch (error) {
    console.error("Lỗi logout:", error)
    // Vẫn clear session và chuyển trang nếu Firebase lỗi
    userSession.clearSession()
    alert("Đã đăng xuất!")
    window.location.href = "login.html"
  }
}

// Hàm setup logout button cho bất kỳ trang nào
export function setupLogoutButton(
  confirmMessage = "Bạn có chắc chắn muốn đăng xuất?",
) {
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      if (confirm(confirmMessage)) {
        await logout()
      }
    })
  }
}

// Hàm kiểm tra đăng nhập đơn giản
export function checkLogin() {
  if (!userSession.isLoggedIn()) {
    window.location.href = "login.html"
    return false
  }
  return true
}

// Hàm kiểm tra quyền admin
export function checkAdmin() {
  const user = userSession.getCurrentUser()
  if (!user || user.role_id !== 1) {
    alert("Bạn không có quyền truy cập trang này!")
    window.location.href = "dashboard.html"
    return false
  }
  return true
}
