const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const admin = require("firebase-admin");
const db = require('./models');
const multer = require('multer');
const routes = require('./Controllers');
require('dotenv').config();

// Initialize administrative privileges for development
//   const serviceAccount = require("./serviceAccountKey.json");
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
// ----------------------------------------------- //

app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// async function getCurrentUser() {
//   try {
//     const user = await admin.auth().getUserByEmail("tjvig94@gmail.com");
//     return user.toJSON().uid;
//   } catch (error) {
//     console.log(`Error: ${error}`)
//   } 
// }

// getCurrentUser().then(res => {
//   db.Post.create({ 
//     title: "First post", 
//     desc: "This is the first post to our server.",
//     image: "THIS WOULD BE IMAGE REFERENCE",
//     user: res
//   })
// })

// db.Post.find({}).then(res => console.log(res));

app.listen(PORT, () => console.log(`App running on port ${PORT}.`));
