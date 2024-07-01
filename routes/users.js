const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/practisingHack')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define the User schema
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

// Define the Admin schema
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

// Define the Order schema
const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['Credit Card', 'Debit Card', 'PayPal']
  }
});

// Define the Table schema
const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  available: { type: Boolean, default: true }
});

orderSchema.index({ username: 1, date: 1, hours: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Order = mongoose.model('Order', orderSchema);
const Table = mongoose.model('Table', tableSchema);

module.exports = { User, Admin, Order, Table };
