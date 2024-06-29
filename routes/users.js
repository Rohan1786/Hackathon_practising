const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
mongoose.connect('mongodb://localhost:27017/practisingHack', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Create initial admin
async function createAdmin() {
  const adminExists = await Admin.findOne({ adminName: 'rohan' });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('123', 10);
    const newAdmin = new Admin({ adminName: 'rohan', password: hashedPassword });
    await newAdmin.save();
    console.log('Admin created');
  }
}

createAdmin();

module.exports = [
  User,
  Admin
];
