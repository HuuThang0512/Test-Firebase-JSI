import { signIn } from "./firebase/auth.js"
import { getErrorMessage } from "./firebase/ErrorMessage.js"
import { userSession } from "./userSession.js"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btnSignIn = document.getElementById("login-btn")

btnSignIn.addEventListener("click", async () => {
  const email = $('input[name="username"]').value
  const password = $('input[name="password"]').value
  try {
    const user = await signIn(email, password)
    const currentUser = userSession.getCurrentUser()

    alert(`Đăng nhập thành công: ${user.email}`)

    // Chuyển hướng dựa trên role_id
    if (currentUser && currentUser.role_id === 1) {
      window.location.href = "admin.html"
    } else {
      window.location.href = "dashboard.html"
    }
  } catch (e) {
    alert(`Lỗi đăng nhập: ${getErrorMessage(e.code)}`)
  }
})
