const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "organizer") {
    alert("Access Denied");
    window.location.href = "login.html";
}

fetch("http://localhost:3000/event")
.then(res=>res.json())
.then(events=>{
    document.getElementById("totalEvents").innerText=events.length;
});

fetch(`http://localhost:3000/event?organizerId=${user.id}`)
.then(res => res.json())
.then(events => {

    Promise.all([
    fetch("http://localhost:3000/events").then(res => res.json()),
    fetch("http://localhost:3000/users").then(res => res.json()),
    fetch("http://localhost:3000/rsvps").then(res => res.json())
])
.then(([events, users, rsvps]) => {

    document.getElementById("totalEvents").innerText = events.length;
    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalRegistrations").innerText = rsvps.length;

});

    const eventList = document.getElementById("eventList");

    events.forEach(event => {

        eventList.innerHTML += `
            <div class="card">
                <img src="${event.image}">
                <h3>${event.title}</h3>
                <p>${event.description}</p>

                <button onclick="editEvent(${event.id})">
                    Edit
                </button>

                <button onclick="deleteEvent(${event.id})">
                    Delete
                </button>
            </div>
        `;
    });
});

// 👇 Add it here
function editEvent(id) {
    window.location.href = `edit-event.html?id=${id}`;
}

// 👇 Delete function
function deleteEvent(id) {
    if (confirm("Delete this event?")) {
        fetch(`http://localhost:3000/events/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("Event Deleted");
            location.reload();
        });
    }
}

// 👇 Logout function
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}