export function getErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email này đã được sử dụng."
    case "auth/invalid-email":
      return "Email không hợp lệ."
    case "auth/weak-password":
      return "Mật khẩu quá yếu. Tối thiểu 6 ký tự."
    case "auth/user-not-found":
      return "Không tìm thấy tài khoản."
    case "auth/wrong-password":
      return "Mật khẩu không đúng."
    case "auth/missing-password":
      return "Bạn chưa nhập mật khẩu."
    default:
      return "Đã xảy ra lỗi. Vui lòng thử lại."
  }
}
