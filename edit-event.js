const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "organizer") {
    alert("Access Denied");
    window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load event details
fetch(`http://localhost:3000/event/${id}`)
.then(res => res.json())
.then(event => {

    document.getElementById("title").value = event.title;
    document.getElementById("description").value = event.description;
    document.getElementById("date").value = event.date;
    document.getElementById("time").value = event.time;
    document.getElementById("location").value = event.location;
    document.getElementById("category").value = event.category;
    document.getElementById("capacity").value = event.capacity;
    document.getElementById("image").value = event.image;

});

function updateEvent() {

    const updatedEvent = {

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

    fetch(`http://localhost:3000/event/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedEvent)

    })
    .then(res => res.json())
    .then(() => {

        alert("Event Updated Successfully");

        window.location.href = "dashboard.html";

    })
    .catch(err => {

        alert("Update Failed");
        console.error(err);

    });

}