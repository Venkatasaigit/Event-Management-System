const API = "https://event-management-system-2-ha7n.onrender.com";

let allEvents = [];

fetch(`${API}/events`)
  .then(res => {
    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    return res.json();
  })
  .then(data => {
    allEvents = data;
    displayEvents(data);
  })
  .catch(error => {
    console.error(error);
    alert("Cannot connect to JSON server");
  });

function displayEvents(events){

    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    events.forEach(event=>{

        eventList.innerHTML += `

        <div class="card">

            <img src="${event.image}">

            <h3>${event.title}</h3>

            <p>${event.description}</p>

            <p><b>Date :</b> ${event.date}</p>

            <p><b>Time :</b> ${event.time}</p>

            <p><b>Location :</b> ${event.location}</p>

            <p><b>Category :</b> ${event.category}</p>

            <button onclick="registerEvent(${event.id})">
                Register
            </button>

            <button onclick="viewEvent(${event.id})">
                View Details
            </button>

        </div>

        `;

    });

}

function searchEvent(){

    const value=document
    .getElementById("search")
    .value
    .toLowerCase();

    const filter=allEvents.filter(event=>

        event.title.toLowerCase().includes(value)

    );

    displayEvents(filter);

}
function registerEvent(eventId){

    const user=JSON.parse(localStorage.getItem("user"));

    if(!user){

        alert("Please Login");

        location.href="login.html";

        return;

    }

    fetch(`http://localhost:3000/rsvps?eventId=${eventId}&userId=${user.id}`)

    .then(res=>res.json())

    .then(data=>{


        if(data.length>0){

            alert("Already Registered");

            return;

        }

        fetch("http://localhost:3000/rsvps",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({

                eventId:eventId,

                userId:user.id,

                status:"Attending"

            })
        })

        .then(()=>{

            alert("Registration Successful");
        });
    });
}
function viewEvent(id){

    window.location.href=`event-details.html?id=${id}`;
}
function logout(){

    localStorage.removeItem("user");

    location.href="login.html";

}