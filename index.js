var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

// Define the path to the text file where you'll store the visitor count.
const countFilePath = path.join(__dirname, 'visitorCount.txt');

// Initialize a set to keep track of unique visitor IP addresses.
const uniqueVisitors = new Set();

// Read the current visitor count from the text file (if it exists).
fs.readFile(countFilePath, 'utf8', (err, data) => {
    if (!err) {
        visitorCount = parseInt(data);
    }
});

app.use(express.static(path.join(__dirname, 'public')));


// Middleware to update the visitor count.
app.use((req, res, next) => {
    // Check if the request is for a resource (e.g., CSS, JS) and exclude it.
    console.log('Checking')
    // if (!req.url.includes('/public/')) {
    //     const visitorIP = req.ip;
    //     if (!uniqueVisitors.has(visitorIP)) {
    //         // Increment the visitor count only for unique visitors.
    //         uniqueVisitors.add(visitorIP);
    //         visitorCount = uniqueVisitors.size;
    //         // Save the updated count to the text file.
    //         fs.writeFile(countFilePath, visitorCount.toString(), (err) => {
    //             if (err) {
    //                 console.error('Error updating visitor count:', err);
    //             }
    //         });
    //     }
    // }
    next();
});

app.get('/visitorcount', (req, res) => {
    res.send(`Visitors: ${visitorCount}`);
});

app.listen(8080);
console.log('Listening on port 8080');
