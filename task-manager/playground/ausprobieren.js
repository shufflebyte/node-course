
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

// file upload with multer
// const multer = require('multer');

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000   // 1 MByte
//     },
//     fileFilter(req, file, cb) {
//         // cb(new Error('File must be a PDF'));
//         // cb(undefined, true);
//         // cb(undefined, false);

//         //if (!file.originalname.endsWith('.pdf')) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please only upload Word docs'));
//         }
//         cb(undefined, true);
//     }
// });



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

// do something with the relationshop between task and user
// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // find owner by task
//     // const task = await Task.findById('5f1ff072903fc89a946b91cc');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);

//     // find user by id
//     try{
//         const user = await User.findById('5f1fe5c7a6ddcc987e746698');
//         await user.populate('tasks').execPopulate();
//         console.log(user.tasks);
//     } catch(e) {
//         console.log(e.message);
//     }

// };

// main();