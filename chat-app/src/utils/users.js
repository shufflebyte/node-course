const users = [];

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!username || !room) {
        return {
            error: 'Username and room are required.'
        };
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    });

    if (existingUser) {
        return {
            error: 'Username is already being used.'
        };
    }

    // Store user
    const user = { id, username, room };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    return users.filter((user) => user.room === room);
};


const getAllRooms = () => {
    rooms = [];
    users.forEach(user => {
        if (!rooms.includes(user.room)) {
            rooms.push(user.room);
        }
    });
    return rooms;
};

// addUser({
//     id: 1,
//     username: "hodor",
//     room: "a"
// });
// addUser({
//     id: 2,
//     username: "asd",
//     room: "a"
// });
// addUser({
//     id: 3,
//     username: "dfg",
//     room: "b"
// });
// addUser({
//     id: 3,
//     username: "dfg",
//     room: "a"
// });

// console.log(getAllRooms());

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getAllRooms
};