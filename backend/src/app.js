const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');


  
const app = express();

app.use(express.json());
// app.use(cors(
//     {
//         origin: ['https://guvi-event-management-project.netlify.app'],
//         // origin: ['http://localhost:5173'],
//         // origin: ['http://localhost:5173','https://guvi-event-management-project.netlify.app'],
//         credentials: true,
//         methods: ['GET', 'POST', 'PATCH', 'DELETE' ,"PUT"],
//     }
// ))


console.log("hello")
module.exports = app;

