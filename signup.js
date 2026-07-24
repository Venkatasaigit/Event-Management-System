function signup() {

    const password = document.getElementById("Password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: password,
        role: document.getElementById("role").value
    };

    fetch("http://localhost:3000/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    })
    .then(res => res.json())
    .then(() => {

        alert("Account Created Successfully");

        window.location.href = "login.html";

    })
    .catch(err => {

        alert(err.message);

    });

}