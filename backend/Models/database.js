const mongoose = require('mongoose');

// Replace these with your actual username, password, and database name
const username = 'GopalDixit';
const password = 'GopalMongodb';
const dbName = 'Mydb';

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.4iwukso.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('Error in MongoDB ... ', err);
});
