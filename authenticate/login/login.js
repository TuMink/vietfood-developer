document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            alert("Email hoặc mật khẩu không đúng!");
            return;
        }

        // Lưu trạng thái đăng nhập
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Đăng nhập thành công!");
        window.location.href = "../../trangChu.html";
    });
});
