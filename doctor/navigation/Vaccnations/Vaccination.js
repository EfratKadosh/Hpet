async function updateVaccein() {
    let phone = document.getElementById("Phone").value;
    let pname = document.getElementById("Pname").value;
    let vaccein = document.getElementById("Vacceins").value;
    let ip = sessionStorage.getItem("ip")

    //fetch
    //call for POST to the url:
    let response = await fetch(`http://${ip}:5000/vaccines/updateVaccein`, {
        //post
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //this is the stuff we refer to as: req.body in the backend!!!!!
        body: JSON.stringify({
            phone_number: phone,
            petname: pname,
            vaccine_type: vaccein
        })
    })
    //get data from backend response as json!
    let body = await response.json()

    alert(body.message)
}