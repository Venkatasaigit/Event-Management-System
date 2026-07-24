const user = JSON.parse(localStorage.getItem("user"));

if(user){
    document.getElementById("welcomeUser").innerHTML =
    `Welcome, ${user.name}`;
}