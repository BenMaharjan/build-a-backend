import express from "express"
import fs from "node:fs/promises"

const app = express();
const port = 3000;

// Given I am a developer who has just followed the instructions to run and install the application (our Express APP),
// When I make a GET request to “http://localhost:3000/”,
// Then I should get back a response with status code of 200 and text saying “Hello World!”
// Then I should also see that the Node API has also logged the request in the terminal (console.log)
app.listen(port, ()=>{
    console.log(`App is running on http:/localhost:${port}`)
})

app.get("/", (req,res)=> {
    res.status(200).send("Hello world");
    console.log("Hello World")
})

// Given I am a developer who has the Activity API running,
// When I make a GET request to “http://localhost:3000/activities”
// Then the the request should succeed, responding with the correct status code and an array of User Activity objects in the response body (response.data).

app.get("/activities", async (req, res) => {   
    try {
        const activitesString = await fs.readFile("./activities.json", "utf-8");
        const activitesData = JSON.parse(activitesString);

        console.log(activitesData);
        
        res.status(200).json({
            "Success :": true,
            "Payload :": activitesData
        })
    } catch {
        console.error("ERROR")
    }
})