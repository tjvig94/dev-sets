const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/devsets", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

admin.auth().getUserByEmail("tjvig94@gmail.com").then(res => {
    console.log(res.toJSON());
})

app.listen(PORT, () => console.log(`App running on port ${PORT}.`));
