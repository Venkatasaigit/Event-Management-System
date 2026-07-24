const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
    window.location.href = "login.html";
}

const form = document.getElementById("eventForm");

form.addEventListener("submit", createEvent);

async function createEvent(e){

    e.preventDefault();

    const event={

        title:title.value,

        description:description.value,

        date:date.value,

        location:location.value,

        image:image.value,

        organizerId:loggedUser.id

    };

    await fetch("http://localhost:3000/events",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(event)

    });

    alert("Event Created Successfully");

    form.reset();

    loadEvents();

}

async function loadEvents(){

    const res=await fetch("http://localhost:3000/events");

    const events=await res.json();

    const myEvents=events.filter(e=>e.organizerId===loggedUser.id);

    let output="";

    myEvents.forEach(event=>{

        output+=`

        <div class="card">

        <img src="${event.image}" alt="">

        <h3>${event.title}</h3>

        <p>${event.description}</p>

        <p>${event.date}</p>

        <p>${event.location}</p>

        <button onclick="deleteEvent(${event.id})">

        Delete

        </button>

        </div>

        `;

    });

    document.getElementById("eventList").innerHTML=output;

}

async function deleteEvent(id){

    if(confirm("Delete Event?")){

        await fetch(`http://localhost:3000/events/${id}`,{

            method:"DELETE"

        });

        loadEvents();

    }

}

function logout(){

    localStorage.removeItem("loggedUser");

    window.location.href="login.html";

}

loadEvents();