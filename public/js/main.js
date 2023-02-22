//frontend javascript

function onSubmit(e) {

    e.preventDefault();

    //getting id of prompt, and then it's value. 
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt === ''){
        alert('Please add some text');
        return;

    }

    //separate function
    generateImageRequest(prompt, size);

}

async function generateImageRequest(prompt,size){

    try {
        showSpinner();
        //fetch request with an endpoint of openai generateIMage
        const response = await fetch('/openai/generateimage', {
            //different options
            //want to be post request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //body will be prompt and size in and object, but we need
            //it as a string
            body: JSON.stringify({
                prompt,
                size
            })
        });

        //400 doesn't always count as error

        if(!response.ok){
            removeSpinner();
            throw new Error('That image could not be generated');
        }
        //if no problem, then...
        const data = await response.json();
        console.log(data);
        //after getting data we need to remove spinner as well

        removeSpinner();
        
    } catch (error) {
        
        //there is an h2 that has a class of msg and we change it to the rror. 
        document.querySelector('.msg').textContent = error;
        
    }

}

function showSpinner(){
    //basically for class of spinner we will add a class of show, which
    //will show the spinner
    document.querySelector('.spinner').classList.add('show');
}
//e is passing in event object

function removeSpinner(){
    //basically for class of spinner we will add a class of show, which
    //will show the spinner
    document.querySelector('.spinner').classList.remove('show');
}

//adding event listener to form
//waits for event to occur and then runs the function. 
document.querySelector('#image-form').addEventListener('submit', onSubmit);
