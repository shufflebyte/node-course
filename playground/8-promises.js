// const { callbackify } = require("util");

// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         callback("This is my error", undefined); //FAILURE
//         // callback(undefined, [1,2,3]); // SUCCESS
//     }, 2000)

// };

// doWorkCallback((error, result) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log(result);
// });

// /// --- Promises

// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         //resolve([1,2,3]);
//         reject("This is my error");
//     }, 2000);
// });

// doWorkPromise.then((result) => {
//     console.log("SUCCESS", result);
// }).catch((error) => {

//     console.log("ERROR!", error);
// });


// ----------------------------------
// Promise chaining

const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

// add(1,2).then((sum) => {
//     console.log(sum);
//     add(sum, 5).then((sum2) => {
//         console.log(sum2);
//     }).catch((e) => {
//         console.log(e);
//     })
// }).catch((e) => {
//     console.log(e);
// });
// the more chaining, the more nesting! :(

add(1,1).then((sum) => {
    console.log(sum);
    return add(sum, 4);
}).then((sum2) => {
    console.log(sum2);
}).catch((e) => {
    console.log(e);
});