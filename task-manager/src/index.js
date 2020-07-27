const express = require('express');
require('./db/mongoose');

const { Router } = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
// PORT needed for heroku
const port = process.env.PORT || 3000;

// middleware functions

// app.use((req, res, next) => {
//     // console.log(req.method, req.path);
//     // next();


//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Started server on port " + port);
});


// ausprobieren
// hash passwords -------------------------------
// const bcrypt = require('bcryptjs');
// const myFunction = async () => {
//     const password = 'Red12345!'
//     saltRounds = 8;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     console.log(password);
//     console.log(hashedPassword);
    
//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
//     console.log(isMatch);
// };
// myFunction();

// use jwt -------------------------------
// const jwt = require('jsonwebtoken');
// const myFunction = async () => {

//     // create token
//     const mySecretKey = 'thisismysecretkey'
//     const token = jwt.sign({_id: 'abc123'}, mySecretKey, {expiresIn: '7 days'});
//     console.log(token);
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1OTU4NDc0MDV9.vsdrGsjr5h-y1Iz5xvhVDpkziMzGGq0sXjgF2S9c6ZI
//     //Format: head.payload.signature

//     // verify token
//     try {
//         const data = await jwt.verify(token, mySecretKey);
//         console.log(data);

//     } catch(e) {
//         console.log("Error", e.message);
//     }
    

// }
// myFunction();