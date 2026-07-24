const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
    window.location.href = "login.html";
}

async function loadEvents() {

    const response = await fetch("http://localhost:3000/events");

    const events = await response.json();

    let output = "";

    events.forEach(event => {

        output += `
        <div class="card">

            <img src="${event.image}" alt="Event Image">

            <h3>${event.title}</h3>

            <p><strong>Date:</strong> ${event.date}</p>

            <p><strong>Location:</strong> ${event.location}</p>

            <p>${event.description}</p>

            <button onclick="registerEvent(${event.id})">
                RSVP
            </button>

        </div>
        `;

    });

    document.getElementById("eventContainer").innerHTML = output;

}

async function registerEvent(eventId){

    const response = await fetch("http://localhost:3000/rsvps");

    const rsvps = await response.json();

    const alreadyRegistered = rsvps.find(r =>
        r.eventId === eventId &&
        r.userId === loggedUser.id
    );

    if(alreadyRegistered){

        alert("You have already registered for this event.");

        return;

    }

    const rsvp = {

        eventId:eventId,

        userId:loggedUser.id,

        status:"Attending"

    };

    await fetch("http://localhost:3000/rsvps",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(rsvp)

    });

    alert("RSVP Successful!");

}

function logout(){

    localStorage.removeItem("loggedUser");

    window.location.href="login.html";

}

loadEvents();