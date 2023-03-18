const express = require('express');
const fs = require('fs');
const { request } = require('http');
const app = express();
const PORT = 8000;
const insultsJSON = require('./insults.json');

const { filterPlays } = require('./utils.js')

app.use(express.json); // Translate everything coomesin the body to json

app.get('/', (request, response )=>{
    response.send('<h1>Hello swrold from Node.js</h1>') // Response.send() this is the last thing we should do, it works as a return from a function
})

app.get('/api/insults', (request, response)=>{
    //console.log(request)
    //response.send("<h1>Hello world</h1>")
    const file = fs.createReadStream('insults.json'); // Read our insults.json file 
    file.pipe(response); // sends the file to the frontend 
});

app.post('/api/insults', (request, response)=>{
    const insult = request.body;
    console.log(insult)
    insultsJSON.insults.push(insult);

    fs.writeFile('instuls.json', JSON.stringify(insultsJSON), (error)=>{
        if (error){
            console.log(error)
        }
    });

    const resObj = {
        success: true,
        insults: insultsJSON.insults,
        //date: new Date()
    }

    response.json(resObj);
});


app.get('/api/insults/:play', (request, response)=>{
    const play = request.params.play;
    console.log(request.params)
    const result = filterPlays(insultsJSON.insults, play);

    const resObj = {
        sucess: true,
        insults: result
    }
    response.json(resObj);
});

app.listen(PORT, ()=>{
    console.log("Server started")
});