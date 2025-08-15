// signupAdmin.js - Đăng ký admin với mã xác thực
import { signUp } from "./firebase/auth.js"
import { getErrorMessage } from "./firebase/ErrorMessage.js"
import { userSession } from "./userSession.js"

const $ = document.querySelector.bind(document)
const btnSignUp = $("#signup-btn")

// Mã admin bí mật (trong thực tế nên lưu trong biến môi trường)
const ADMIN_CODE = "admin123"

btnSignUp.addEventListener("click", async () => {
  const email = $('input[name="username"]').value.trim()
  const password = $('input[name="password"]').value
  const confirmPassword = $('input[name="confirmPassword"]').value
  const adminCode = $('input[name="adminCode"]').value.trim()

  try {
    // Validate
    if (!email || !password || !confirmPassword || !adminCode) {
      throw new Error("Vui lòng điền đầy đủ thông tin")
    }

    if (password !== confirmPassword) {
      throw new Error("Mật khẩu xác nhận không khớp")
    }

    if (password.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự")
    }

    if (adminCode !== ADMIN_CODE) {
      throw new Error("Mã Admin không đúng!")
    }

    // Đăng ký với role_id = 1 (admin)
    const role_id = 1
    const user = await signUp(email, password, role_id)

    // Lưu session sau khi đăng ký thành công
    userSession.saveSession(user, { role_id, balance: 0 })

    alert(
      `Đăng ký Admin thành công!\nEmail: ${user.email}\nVai trò: Administrator`,
    )
    window.location.href = "admin.html"
  } catch (e) {
    alert(`Lỗi đăng ký: ${getErrorMessage(e.code) || e.message}`)
  }
})
