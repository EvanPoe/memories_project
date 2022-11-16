import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

// initialize app so we can use all different methods on that app instance 
// use express middleware to connect to application
const app = express();
dotenv.config();

// setting up bodyParser so it can properly send the requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// set up starting path for all the routes inside posts.js
// make sure cors is ABOVE your routes!!!
app.use('/posts', postRoutes);

// connect server application to a real database. Mongodb is going to host our DB on their cloud
// https://www.mongodb.com/cloud/atlas
const PORT = process.env.PORT || 5000;

// use mongoose to connect to our database
mongoose.connect(process.env.CONNECTION_URL)
    // chain a .then because this returns a promise. If our connection is successful, call our app, and then on it call app.listen. That takes two parameters, the PORT and a callback function that returns a console log once our application successfully listens. If connection to DB is not successful, error message
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));