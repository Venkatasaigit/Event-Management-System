const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please Login");
    window.location.href = "login.html";
}

document.getElementById("name").textContent = user.name;
document.getElementById("email").textContent = user.email;
document.getElementById("role").textContent = user.role;

function logout() {
    localStorage.removeItem("user");
    alert("Logged Out Successfully");
    window.location.href = "login.html";
}