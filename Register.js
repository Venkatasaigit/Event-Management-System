function register(id){

const user={
    eventId:id,
    userName:"Sandeep"
}

fetch("http://localhost:3000/registrations",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(user)

})
.then(()=>alert("Registration Successful"));

}