const mongoose = require('mongoose');

// const mongoUser = "su";
// const mongoPasswd = "LfkL4DLMFißk3045ksdfl";
// const databaseName = "task-manager-api";

mongoUser = process.env.MONGO_USER;
mongoPasswd = process.env.MONGO_PASS;
mongoDatabaseName = process.env.MONGO_DB
const connectionString = "mongodb+srv://" + mongoUser + ":" + mongoPasswd + "@cluster0-yoora.gcp.mongodb.net/" + mongoDatabaseName + "?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});