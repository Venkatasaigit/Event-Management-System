function register(id){

const user={
    eventId:id,
    userName:"Sandeep"
}
const API = "https://event-management-system-2-ha7n.onrender.com";
fetch("http://localhost:3000/registrations",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(user)

})
.then(()=>alert("Registration Successful"));

}