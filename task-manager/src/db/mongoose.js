const mongoose = require('mongoose');

const mongoUser = "su";
const mongoPasswd = "LfkL4DLMFißk3045ksdfl";
const databaseName = "task-manager-api";
const connectionString = "mongodb+srv://" + mongoUser + ":" + mongoPasswd + "@cluster0-yoora.gcp.mongodb.net/" + databaseName + "?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});