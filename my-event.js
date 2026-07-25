const API = "https://event-management-system-2-ha7n.onrender.com";

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    alert("Please Login");
    window.location.href = "login.html";
}

Promise.all([
    fetch(`${API}/events`).then(res => res.json()),
    fetch(`${API}/rsvps?userId=${user.id}`).then(res => res.json())
])
.then(([events, rsvps]) => {

    const eventIds = rsvps.map(r => r.eventId);

    const myEvents = events.filter(event =>
        eventIds.includes(event.id)
    );

    displayMyEvents(myEvents, rsvps);
});

function displayMyEvents(events, rsvps) {
    const container = document.getElementById("myEvents");
    container.innerHTML = "";

    if (events.length === 0) {
        container.innerHTML = "<h2>No Events Registered</h2>";
        return;
    }
    events.forEach(event => {
        const rsvp = rsvps.find(r => r.eventId === event.id);

        container.innerHTML += `
        <div class="card">
            <img src="${event.image}">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><b>Date:</b> ${event.date}</p>
            <p><b>Location:</b> ${event.location}</p>
            <button onclick="cancelRegistration(${rsvp.id})">
                Cancel Registration
            </button>
        </div>
        `;
    });
}
function cancelRegistration(id) {
    if (confirm("Cancel this registration?")) {
        fetch(`${API}/rsvps/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            alert("Registration Cancelled");
            location.reload();
        });
    }
}
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}