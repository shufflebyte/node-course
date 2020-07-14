setTimeout( () => {
    console.log('Two seconds are up.');

}, 2000);

const names = ['Andrew', 'Jen', 'Jess'];
const shortNames = names.filter((name) => {
    return name.length <= 4;
});
console.log(shortNames);


// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         };
//         return data;
//     }, 2000);
// };

// if function is synchronous we can use return
// if asynchronous we need to use callback functions!

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };
        callback(data);
    }, 2000);
};


const data = geocode('Philadelphia', (data) => {
    console.log(data);
});
// console.log(data);

// Challenge:

const add = (a,b, callback) => {
    setTimeout(() => {
        mySum = a + b;
        callback(mySum);
    }, 2000);
};

const sum = add(5,4, (callback) => {
    console.log(mySum);
})