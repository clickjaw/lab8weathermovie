const express = require('express');
const weatherRouter = express.Router();
const axios = require('axios');


weatherRouter.get('/:weather', async(req,res)=>{
    let myWeather = req.params.weather
    const API = `http://api.weatherstack.com/current?access_key=8a5158c17d360afda7b5e9e3997bfa21&query=${myWeather}`;
   try{
    const rez = await axios.get(API);
    res.send(rez.data);
   }catch(err){
    console.log(err);
   }
    
})


module.exports = weatherRouter;