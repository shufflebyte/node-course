// const mongoDB = require('mongodb');
// const MongoClient = mongoDB.MongoClient

const { MongoClient, ObjectID } = require('mongodb');

const mongoUser = "su";
const mongoPasswd = "LfkL4DLMFißk3045ksdfl";
const databaseName = "task-manager";

// const id =  new ObjectID();
// console.log(id);

const connectionString = "mongodb+srv://" + mongoUser + ":" + mongoPasswd + "@cluster0-yoora.gcp.mongodb.net/" + databaseName + "?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log(error);
    }
    console.log('Connection established');
    const db = client.db(databaseName);


    // CREATE  ---------------------------------------------------------------

    //     db.collection('users').insertOne({
    //         name: 'Hugo',
    //         age: 50
    //     }, (error, result) => {
    //         if (error) {
    //             return console.log("unable to insert user");
    //         }
    //         console.log(result.ops);
    //     });

    //     db.collection('users').insertMany([
    //         { name: 'Horst', age: 40 },
    //         { name: 'Hubert', age: 44 }
    //     ], (error, result) => {
    //         if (error) {
    //             return console.log("unable to insert user");
    //         }
    //         console.log(result.ops);
    //     });

    //     db.collection('tasks').insertMany([
    //         {
    //             description: 'Clean the house',
    //             completed: true
    //         }, 
    //         {
    //             description: 'Wash the car',
    //             completed: false
    //         }, 
    //         {
    //             description: 'Cut the lawn',
    //             completed: false
    //         }, 
    //     ], (error, result) => {
    //         if (error) {
    //             return console.log("unable to insert tasks");
    //         }
    //         console.log(result.ops);
    //     });
    // });


    // READ ---------------------------------------------------------

    // find and findOne()

    // db.collection('users').findOne({ name: 'Horst' }, (error, user) => {
    //     if (error) {
    //         return console.log("unable to fetch Horst");
    //     }
    //     console.log(user);
    // });

    // // ObjectID is no string, but a binary array...
    // db.collection('users').findOne({ _id: new ObjectID('5f183f50e221b914693a4385') }, (error, user) => {
    //     if (error) {
    //         return console.log("unable to insert tasks");
    //     }
    //     console.log(user);
    // });

    // db.collection('users').find({name: 'Hugo'}).toArray((error, users) => {
    //     if (error) {
    //         return console.log("unable to fetch users");
    //     }
    //     console.log(users);    
    // });

    // db.collection('users').find({name: 'Hugo'}).count((error, num_hugos) => {
    //     if (error) {
    //         return console.log("unable to count all Hugos");
    //     }
    //     console.log(num_hugos);    
    // });

    // UPDATE -----------------------------------------
    // hier wird ein promise genutzt (automatisch genutzt, wenn kein callback provided..)
    // set operator, andere: max, min, , inc, ....
    // const updatePromise = db.collection('users').updateOne({_id: new ObjectID("5f183f50e221b914693a4384")}, 
    // {
    //     $set: {
    //         name: "Heribert"
    //     }
    // });

    // updatePromise.then( (result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // const updatePromise2 = db.collection('users').updateOne({_id: new ObjectID("5f183f50e221b914693a4384")}, 
    // {
    //     $inc: {
    //         age: 1
    //     }
    // });

    // updatePromise2.then( (result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // const updateMoreThanOnePromise = db.collection('tasks').updateMany({completed: false}, {
    //     $set: {
    //         completed: true
    //     }
    // });

    // updateMoreThanOnePromise.then((result) => {
    //     console.log("WORKED!", result);
    // }).catch((error) => {
    //     console.log("Error: ", error);
    // });

    // DELETE ----------------------------

    db.collection('users').deleteMany({
        age: 44
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log("Error:", error);
    })

    db.collection('tasks').deleteOne({
        _id: new ObjectID("5f184092b5d20614d55fb6cb")
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log("Error:", error);
    });

});
