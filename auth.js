document.addEventListener("DOMContentLoaded", () =>
{
    const login = document.getElementById("loginForm");
    if (login)
        login.addEventListener("submit", e =>
        {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim(),
                password = document.getElementById("loginPassword").value;
            if (!email || !password)
                return;
            const saved = JSON.parse(localStorage.getItem("skillswapAccounts") || "[]");
            const account = saved.find(a => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
            const user = account ? { name: account.fullName, username: account.username, email: account.email, avatar: "🎓", 
                offering: ["Web Development", "Python"],
                learning: ["Spanish", "UI Design"]
            } :
            {
                name: email.split("@")[0].replace(/[._-]/g, " "),
                username: email.split("@")[0], email, avatar: "🎓", offering: ["Web Development", "Python"],
                learning: ["Spanish", "UI Design"]
            };
            localStorage.setItem("skillswapUser", JSON.stringify(user));
            location.href = "index.html";
        });
    const signup = document.getElementById("signupForm");
    if (signup)
        signup.addEventListener("submit", e =>
        {
            e.preventDefault(); const fullName = document.getElementById("fullName").value.trim(),
                username = document.getElementById("username").value.trim(),
                email = document.getElementById("signupEmail").value.trim(),
                password = document.getElementById("signupPassword").value,
                confirm = document.getElementById("confirmPassword").value;
            if (password !== confirm)
            {
                alert("Passwords do not match!");
                return;
            }
            if (password.length < 6)
            {
                alert("Password must be at least 6 characters.");
                return;
            }
            const accounts = JSON.parse(localStorage.getItem("skillswapAccounts") || "[]");
            if (accounts.some(a => a.email.toLowerCase() === email.toLowerCase()))
            {
                alert("An account with this email already exists.");
                return;
            }
            accounts.push({ fullName, username, email, password });
            localStorage.setItem("skillswapAccounts", JSON.stringify(accounts));
            localStorage.setItem("skillswapUser",
                JSON.stringify({
                    name: fullName, username, email, avatar: "🚀", offering: ["General Tutoring"],
                    learning: ["Graphic Design"]
                }));
            location.href = "index.html";
        });
});