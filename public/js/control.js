
$(document).ready(function () {
  if (!document.cookie) {
    $("#login-logout-btn").append("<a href='/user/login' class='btn btn-light'>Đăng nhập</a>")
  } else {
    $("#login-logout-btn").append("<a href='/main' class='btn btn-light'>Làm việc</a>")
  }
});