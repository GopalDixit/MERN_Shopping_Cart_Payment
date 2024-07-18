const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Auth-db', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log("Error in MongoDB ... ",err);
})
