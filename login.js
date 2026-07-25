function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const API = "https://event-management-system-2-ha7n.onrender.com";

    fetch(`${API}/users`)
        .then(response => response.json())
        .then(users => {
            const user = users.find(
                u => u.email === email && u.password === password
            );

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                alert("Login Successful");
                window.location.href = "index.html";
            } else {
                alert("Invalid Email or Password");
            }
        })
        .catch(error => {
            console.error(error);
            alert("Cannot connect to JSON Server");
        });
}