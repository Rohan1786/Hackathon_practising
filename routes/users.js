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
  },
  Res: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  FoodCategory: { 
    type: String, 
    required: true, 
    enum: [
      'Italian',
      'Chinese',
      'Japanese',
      'Indian',
      'Mexican',
      'French',
      'Thai',
      'Mediterranean',
      'American',
      'Greek'
    ]
  },
  AreaCategory: { 
    type: String, 
    required: true, 
    enum: [
      'Belagaum',
      'Khanapur',
      'Bagalkote',
      'Benguluru',
      'Kodchi',
      'Goa',
      'Pune',
      'Kakati',
      'Shiroli',
      'Ballari',
      'Mandya',
      'Bidar',
      'Chickmangaluru',
      'Davangere',
      'Gadag',
      'Hubli',
      'Dharwad',
    ]
  },
  image: {
    type: String, // URL or path to the image
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
    enum: ['Credit Card', 'Debit Card', 'PayPal','UPI']
  }
});

// Define the Table schema
const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

const bookingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  tableNumber: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);


const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true, unique: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' },
  price: { type: Number, default: 200 }
});

const Seat = mongoose.model('Seat', seatSchema);
orderSchema.index({ username: 1, date: 1, hours: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Order = mongoose.model('Order', orderSchema);
const Table = mongoose.model('Table', tableSchema);


module.exports = { User, Admin, Order, Table,Seat,Booking};
