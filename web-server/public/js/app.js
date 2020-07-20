console.log('Client-side JS is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);

    messageOne.textContent = "Fetching data ...";
messageTwo.textContent = "";

    fetch('/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            console.log(data.error);
            messageOne.textContent = "";
            messageTwo.textContent = data.error;
            return;
        }
        messageOne.textContent = data.location + ": " + data.forecast;
        messageTwo.textContent = "";
        console.log(data.location);
        console.log(data.forecast);
        
    });
});
});