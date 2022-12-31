const { addListener } = require("nodemon");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//do a complete text function
//generate a youtube video title based on the content of the video described as follows: 

const generateImage = async (req, res) => {
    
    //destructure from request.body
    const {prompt,size} = req.body;
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512': '1024x1024';

    try {
        const response = await openai.createImage({
            prompt,
            //this will use whatever is passed in from the request
            //on line 14
            n: 3,
            size: imageSize,
            //prompt is desk describing image
            //n is the number of images
        });
         
        const imageUrl = response.data.data[0].url
        //will give us url since data is an array

        //this will be our response
        res.status(200).json({
            success: true,
            data: imageUrl,

        });
    } catch (error) {
        //this is from the docs that tells us why it is not working
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated',

        })
        
    }

}

//separate function
//async because openai library will give us a promise
//wait till finished?

module.exports = { generateImage}