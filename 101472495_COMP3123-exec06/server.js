const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/NoteRoutes');  // Updated to match file name

const DB_URL = "mongodb+srv://admin:Mn%40590241@cluster0.yxkqj.mongodb.net/?authSource=admin&replicaSet=atlas-12o45i-shard-0&retryWrites=true&w=majority&appName=Cluster0&ssl=true";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB Atlas database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

// Default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Note-taking application - Week06 Exercise</h1>");
});

// Use the /api/notes prefix for all routes defined in NoteRoutes
app.use('/api/notes', notesRoutes);

// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
