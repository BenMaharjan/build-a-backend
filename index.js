import express from "express"

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