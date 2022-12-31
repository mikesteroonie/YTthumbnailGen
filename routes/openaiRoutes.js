const express = require('express');
const {generateImage} = require('../controllers/openaiController');
//generating a function? {} destructures generateIMage from the con
//this way instead of having an anonymous function we can have generateImage
const router = express.Router();

router.post('/generateimage', generateImage);

//LESSON: go into postman and type the url http://localhost:3000/openai/generateimage
//under post and under the generate image url it will do the req res
//and generate the json

module.exports = router;
//exports this to the router