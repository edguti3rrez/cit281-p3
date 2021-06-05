/*
    CIT 281 Project 3
    Name: Edwin Gutierrez
*/

// Imported module and packages for the server
const { coinCount, coins } = require('./p3-module.js');

const fs = require('fs');
const fastify = require('fastify') ();

const listenIP = 'localhost';
const listenPort = 8080;

// Main server site dealing with "/", will render the html for the homepage
fastify.get("/", (req, res) => {

    // reads and renders the html file
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            console.log(err);
            res.code(500);
            res.header("Content-Type", "text/plain");
            res.send("Error processing request")
        } else {

            // serves the html file, accounting for the html text type
            res.code(200);
            res.header("Content-Type", "text/html");
            res.send(data);
        }
    })
});

// Handles a subpage of "/coin" along with two query parameters of denom and count
fastify.get("/coin", (req, res) => {
    console.log(req.query);

    // Will grab the query values and store into denom and count variables
    const { denom = 0, count = 0 } = req.query

    // Will calculate coinValue using the imported coinCount function
    const coinValue = coinCount({ denom: parseInt(denom), count: parseInt(count) })

    res
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2> <br /><a href="/">Home</a> `); // Displays the result and gives link to return to homepage
});

// Final GET route for "/coins" will handle a single query paramter
fastify.get("/coins", (req, res) => {
    const { option } = req.query;
    let coinValue = "";

    // Based on the query value will display a different coinValue
    switch (option) {
        case "1":
            coinValue = coinCount( { denom: 5, count: 3 }, { denom: 10, count: 2 } );
            break;
        case "2":
            coinValue = coinCount(...coins);
            break;
        case "3":
            coinValue = coinCount(coins);
            break;
        default:
            coinValue = 0;
            break;
    }

    res
        .code(200)
        .header("Content-Type", "text/html; charsetutf-8")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /> <a href="/">Home</a>`); // Displays the coinValue and offers a link to homepage
});

// Listens to entering the local IP and port to then display the webpage
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening on http://${listenIP}:${listenPort}`); // test to make sure we're working
});