const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log("Error in MongoDB ... ",err);
})
