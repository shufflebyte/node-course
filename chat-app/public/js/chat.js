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
const upperSidebarTemplate = document.querySelector('#upper-sidebar-template').innerHTML;
const lowerSidebarTemplate = document.querySelector('#lower-sidebar-template').innerHTML;
// Options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true});

const autoscroll = () => {
    //new message element
    const $newMessage = $messages.lastElementChild;

    // height of the new message
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    // visible height
    const visibleHeight = $messages.offsetHeight;

    // height of messages container
    const containerHeight = $messages.scrollHeight;

    // how far have i scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight;

    // was user at the bottom before the new message was displayed?
    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }

}

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('kk:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('kk:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html)
    //console.log(message.url);
    autoscroll();
})

socket.on('roomData', ({ room, users }) => {
    console.log(room)
    console.log(users)

    const html = Mustache.render(upperSidebarTemplate, {
        room,
        users
    });
    console.log(users);
    document.querySelector('#upper-sidebar').innerHTML = html;
});

socket.on('allRoomsData', ({rooms}) => {
    const html = Mustache.render(lowerSidebarTemplate, {
        rooms
    });
    console.log(rooms);
    document.querySelector('#lower-sidebar').innerHTML = html;
});

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

socket.emit('join', {username, room}, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});