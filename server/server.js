"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3011;
const cors = require('cors');
app.use(cors());
const movieRouter = require('./routes/movie.js');
const weatherRouter = require("./routes/weather.js");



app.get('/', (req, res)=>{
    res.send('Lab 8 server')
})

app.use('/weather', weatherRouter)

app.use('/movie', movieRouter)



app.listen(PORT, ()=> console.log(`You got this. Port:${PORT}`))
