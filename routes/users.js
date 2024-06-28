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
  email:{
    type:String,
    required:true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  // date:{
  //   type:Date,
  //   // required:true
  // }
});
const AdminSchema=new mongoose.Schema({
  adminName:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  }
})

const User = mongoose.model('User', userSchema);
const Admin=mongoose.model('Admin',AdminSchema);

module.exports = [User,Admin];
