const fetch = require("node-fetch");
const clientId = "3baeff2785b043cb97ba61e419d9d91d"; 
const clientSecret = "a4b54d2756684f278c816b9fa851a156";  

async function getToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64")
        },
        body: "grant_type=client_credentials"
    });

    const data = await response.json();
    console.log("Access Token:", data.access_token);
}

getToken();