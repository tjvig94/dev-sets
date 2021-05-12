const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/devsets", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`App running on port ${PORT}.`));
