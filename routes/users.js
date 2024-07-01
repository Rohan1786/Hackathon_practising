// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// mongoose.connect('mongodb://localhost:27017/practisingHack', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Define the Admin schema
// const adminSchema = new mongoose.Schema({
//   adminName: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Define the Order schema
// const orderSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   paymentMethod: {
//     type: String,
//     required: true,
//     enum: ['Credit Card', 'Debit Card', 'PayPal']
//   }
// });

// const User = mongoose.model('User', userSchema);
// // const Admin = mongoose.model('Admin', adminSchema);
// const Order = mongoose.model('Order', orderSchema);

// // // Create initial admin
// // async function createAdmin() {
// //   const adminExists = await Admin.findOne({ adminName: 'rohan' });
// //   if (!adminExists) {
// //     const hashedPassword = await bcrypt.hash('123', 10);
// //     const newAdmin = new Admin({ adminName: 'rohan', password: hashedPassword });
// //     await newAdmin.save();
// //     console.log('Admin created');
// //   }
// // }

// // createAdmin();

// // module.exports = [
// //   User,
// //   Admin,
// // Order
// // ];

// module.exports={User,Order};
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/practisingHack')//, { useNewUrlParser: true, useUnifiedTopology: true }
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

// Define the Order schema
const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  date: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['Credit Card', 'Debit Card', 'PayPal'] // Updated to match form values
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
  
  orderSchema.index({ username: 1, date: 1, phoneNumber: 1, email: 1 }, { unique: true });
const Admin = mongoose.model('Admin', adminSchema);

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { User,Admin, Order };
