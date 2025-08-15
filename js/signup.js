import { signUp } from "./firebase/auth.js"
import { getErrorMessage } from "./firebase/ErrorMessage.js"
import { userSession } from "./userSession.js"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const btnSignUp = $("#signup-btn")

btnSignUp.addEventListener("click", async () => {
  const email = $('input[name="username"]').value
  const password = $('input[name="password"]').value
  try {
    // role_id mặc đinh là 2. 1 là admin, 2 là user
    const role_id = 2
    const user = await signUp(email, password, role_id)

    // Lưu session sau khi đăng ký thành công
    userSession.saveSession(user, { role_id, balance: 0 })

    alert(`Đăng ký thành công: ${user.email}`)
    window.location.href = "html/login.html"
  } catch (e) {
    alert(`Lỗi đăng ký: ${getErrorMessage(e.code)}`)
  }
})

