const express = require('express');
const movieRouter = express.Router();
const axios = require('axios');


movieRouter.get('/:movie', async(req,res)=>{
    let myMovie = req.params.movie
    const API = `https://api.themoviedb.org/3/search/movie?api_key=91e393e49283041cb03860d14b8293b8&query=${myMovie}`;
   try{
    const rez = await axios.get(API);
    res.send(rez.data.results[0])
   }catch(err){
    console.log(err);
   }
    
})


module.exports = movieRouter;