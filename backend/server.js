import express from "express";
import { mongoDBURL } from './config.js';
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
const PORT = process.env.PORT || 8080;
const app = express();

//Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS POLICY
//Option 1: Allow all origins with Default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(cors({
//   origin:'http://localhost:8000',
//   methods:['GET' , 'POST' , 'PUT' , 'DELETE'],
//   allowedHeaders:['Content-Type'],
// })
// );

app.get('/', (req, res) => {
  res.send("hello World");
});
// Route for Save a new Book
// All Routes are moved to booksRoutes.js for better writing and use
app.use('/books' , booksRoute);
//Connecting mongoDB using mongoose
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    // i only want server to run if connection with mongoogse is successfull
    app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
  })
  .catch(() => {
    console.log("error");
  });
