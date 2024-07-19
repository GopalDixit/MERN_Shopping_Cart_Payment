const mongoose = require('mongoose');

// Replace these with your actual username, password, and database name
const username = 'GopalDixit';
const password = 'GopalMongodb';
const dbName = 'Mydb';

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('Error in MongoDB ... ', err);
});
