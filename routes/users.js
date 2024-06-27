const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/practisingHack', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date:{
    type:Date,
    // required:true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
