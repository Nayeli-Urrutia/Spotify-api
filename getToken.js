const fetch = require("node-fetch");
const clientId = "be5f76c9e7524b288bbbca614763a6ee"; 
const clientSecret = "b581612a93c4411a87e6060d6172427e";  

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