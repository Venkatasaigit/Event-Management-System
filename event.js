function registerEvent(eventId){

    const user=JSON.parse(localStorage.getItem("user"));

    if(!user){
        alert("Please Login");
        location.href="login.html";
        return;
    }

    fetch(`${API}/rsvps?eventId=${eventId}&userId=${user.id}`)
    .then(res=>res.json())
    .then(data=>{

        if(data.length>0){
            alert("Already Registered");
            return;
        }

        fetch(`${API}/rsvps`,{
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