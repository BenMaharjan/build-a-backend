import express from "express"  
import fs from "node:fs/promises"  // Imports promise based API of the fs module. Allows use of async/await asynchronous code

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

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
});

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
    } catch(error) {
        res.status(500).json({
            "Success :": false,
            "Message :": "Failed to load"
        });
    }
});

// Given I am a developer who has the Activity API running,
// When I make a POST request to “http://localhost:3000/activities” with a request body containing a JSON object (new activity),
// Then the API should save the new activity to the activities.json file giving it a unique “id” (UUID) and activity_submitted (time stamp - Date.now()),
// Then the the request should succeed, responding with the correct status code and the activity object that I posted as the response body (response.data).

app.post("/activities", async (req,res)=>{
    try{
        const newActivity = req.body;
        const activitesString = await fs.readFile("./activities.json", "utf-8");
        const activitesData = JSON.parse(activitesString);

        if(!newActivity ||!newActivity.activity_type ||!newActivity.activity_duration||!newActivity.id||!newActivity.activity_submitted) {
            res.status(404).json({
                "Success :":false,
                "Message :": "User input error"
            })
        } else {
            activitesData.push(newActivity);
            await fs.writeFile("./activities.json",JSON.stringify(activitesData,null,2));
            console.log(newActivity);

            res.status(201).json({
                "Success :": true,
                "Payload :": newActivity
            })
        }
    } catch(error) {
        res.status(500).json({
            "Success :": false,
            "Message :": "Internal server error"
        });
    }
});