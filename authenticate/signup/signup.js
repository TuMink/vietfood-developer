document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    const newUser = {
      fullname,
      email,
      password, // Có thể mã hóa nếu cần bảo mật
    };

    // Lấy danh sách user hiện tại trong localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra trùng email
    const isExist = users.some((user) => user.email === email);
    if (isExist) {
      alert("Email này đã được đăng ký.");
      return;
    }

    users.push(newUser);

    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    form.reset();

    // Chuyển sang trang đăng nhập nếu muốn
    window.location.href = "../login/index.html";
  });
});
