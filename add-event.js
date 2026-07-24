const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "organizer") {
    alert("Access Denied");
    window.location.href = "login.html";
}

function addEvent() {

    const event = {

        title: document.getElementById("title").value,

        description: document.getElementById("description").value,

        date: document.getElementById("date").value,

        time: document.getElementById("time").value,

        location: document.getElementById("location").value,

        category: document.getElementById("category").value,

        capacity: Number(document.getElementById("capacity").value),

        image: document.getElementById("image").value,

        organizerId: user.id

    };

    fetch("http://localhost:3000/events", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(event)

    })
    .then(res => res.json())
    .then(() => {

        alert("Event Added Successfully");

        window.location.href = "dashboard.html";

    })
    .catch(err => {

        alert("Failed to add event");

        console.log(err);

    });

}