const mongoose = require('mongoose');

// Replace these with your actual username, password, and database name

const mongoURI = `mongodb+srv://gopaldixit9450:N4tEEMO3UwssJiYP@admincluster.rgu9w.mongodb.net/?retryWrites=true&w=majority&appName=admincluster`;

mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.log('Error in MongoDB ... ', err);
});
