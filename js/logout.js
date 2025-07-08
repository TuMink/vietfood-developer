// logout
document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const userBox = document.getElementById("user-box");
    const userName = document.getElementById("user-name");
    const userMenu = document.getElementById("user-menu");
    const logoutBtn = document.getElementById("logout-btn");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        userBox.style.display = "inline-block";
        userName.textContent = `👤 ${loggedInUser.fullname || "Người dùng"}`;
    }

    userBox.addEventListener("click", () => {
        userMenu.style.display = userMenu.style.display === "block" ? "none" : "block";
    });

    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        // show popup notification
        const popup = document.createElement("div");
        popup.textContent = "Bạn đã đăng xuất thành công!";
        popup.style.position = "fixed";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.background = "rgba(0,0,0,0.8)";
        popup.style.color = "#fff";
        popup.style.padding = "20px 30px";
        popup.style.borderRadius = "8px";
        popup.style.zIndex = "10000";
        popup.style.fontSize = "1.2rem";
        document.body.appendChild(popup);
        // time out 2s hide popup, navigate to trangchu
        setTimeout(() => {
            document.body.removeChild(popup);
            window.location.href = "trangChu.html";
        }, 1000);
    });

    document.addEventListener("click", function (e) {
        if (!userBox.contains(e.target)) {
            userMenu.style.display = "none";
        }
    });
});