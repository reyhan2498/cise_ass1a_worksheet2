const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const path = require('path');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

if(process.env.NODE_ENV == "production" || production){
    app.use(express.static(path.join(__dirname, '/frontend/cise_ass1a_worksheet2')));

    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}else{
    app.get('/', (req, res) =>{
        res.send('API is running');
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));