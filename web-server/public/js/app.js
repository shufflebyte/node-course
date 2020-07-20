console.log('Client-side JS is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     });
// });

// fetch('http://localhost:3000/weather?address=boston').then((res) => {
//     res.json().then((data) => {
//         if(data.error) {
//             console.log(data.error);
//             return;
//         }
//         console.log(data.location);
//         console.log(data.forecast);
        
//     });
// });

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

    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
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