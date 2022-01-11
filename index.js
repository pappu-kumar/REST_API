const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/AlienDBex';

const app = express();

// mongo db connection 
mongoose.connect(url);
const con = mongoose.connection;

con.on('open', ()=>{
    console.log('mongodb database connected...');
})

app.use(express.json());

const alienRouter = require('./routers/aliens')
app.use('/aliens',alienRouter);

app.listen(3000, ()=>{
    console.log('server running on port 3000');
})