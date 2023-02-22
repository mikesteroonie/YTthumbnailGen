const path = require('path');
//path module

const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
//basically sets port to the port value from env, but if it's not there
//default is 5000

//intializing express
 const app = express();

 //Enable body parser
 app.use(express.json());

 app.use(express.urlencoded({extended:false}));
 //Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
 //middleware allows us to respond to object

 //setstaticfolder
 //dirname is current directory
 app.use(express.static(path.join(__dirname, 'public')));

 app.use('/openai', require('./routes/openaiRoutes'));
//separate route file so that we can use multiple apis from openai
//so we use /openai/generate image

 app.listen(port, () => console.log(`Server started on port ${port}`));
 //listen we pass in the port and then run a funciton   