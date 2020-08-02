const socket = io();

// Elements (convention: $ for html elements)
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('kk:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationMessageTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('kk:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html)
    console.log(message.url);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // disable the form
    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {

        // enable form
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);
        }
        console.log("Delivered");
    });
});

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    // disable button
    $locationButton.setAttribute('disabled', 'disabled');

    // does not support promises..
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log("Location shared!");
            $locationButton.removeAttribute('disabled');
            $messageFormInput.focus();
        });
    });
});