// var express = require('express');
// var router = express.Router();
// const bcrypt = require('bcrypt');
// // const { User, Admin, Order } = require('./users'); // Ensure the path to your User model is correct
// const {User,Order} = require('./users'); // Ensure the path to your User model is correct

// const saltRounds = 10;

// /* GET home page. */
// router.get('/', (req, res) => {
//   res.render('index');
// });

// // Signup route
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const newUser = new User({ username, email, password: hashedPassword });

//     await newUser.save();
//     res.status(201).redirect('/login');
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Error creating user', error });
//   }
// });

// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

// // Login route
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).redirect('order');
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// });

// // Admin login route
// router.get('/admin-login', (req, res) => {
//   res.render('admin-login');
// });

// router.post('/admin-login', async (req, res) => {
//   try {
//     const { adminName, password } = req.body;

//     const admin = await Admin.findOne({ adminName });
//     if (!admin) {
//       return res.status(400).json({ message: 'Invalid admin name or password' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid admin name or password' });
//     }

//     // Set session or JWT token here if needed

//     res.status(200).redirect('/admin');
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// });

// // Protected admin page
// function isAuthenticated(req, res, next) {
//   // Check if the user is authenticated (e.g., check session or JWT token)
//   // This is a placeholder logic; implement actual authentication check
//   if (req.isAuthenticated && req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/admin-login');
//   }
// }

// router.get('/admin', isAuthenticated, (req, res) => {
//   res.render('admin');
// });


// router.post('/order', async (req, res) => {
//   try {
//     const { username, date, phoneNumber, email, paymentMethod } = req.body;

//     // Create a new order
//     const newOrder = new Order({
//       username,
//       date,
//       phoneNumber,
//       email,
//       paymentMethod
//     });

//     // Save the order to the database
//     await newOrder.save();

//     // Respond with a success message or redirect to a success page
//     res.send('Order placed successfully');
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).send('An error occurred while placing the order');
//   }
// });
// router.get('/order', (req, res) => {
//   res.render('order'); // Ensure you have a corresponding order.ejs or order.pug file in your views folder
// });

// module.exports = router;
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { User, Admin,Order } = require('./users'); // Ensure the path to your User model is correct

const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).redirect('/login');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).redirect('order');
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
  async function createAdmin() {
    const adminExists =  await Admin.findOne({ adminName: 'rohan' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('123', 10);
      const newAdmin = new Admin({ adminName: 'rohan', password: hashedPassword });
      await newAdmin.save();
      console.log('Admin created');
    }
  }
  
  createAdmin();
});

router.post('/order', async (req, res) => {
  try {
    const { username, date, phoneNumber, email, paymentMethod } = req.body;
    const newOrder = new Order({
      username,
      date,
      phoneNumber,
      email,
      paymentMethod
    });
    await newOrder.save();
    res.send('Order placed successfully');
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('An error occurred while placing the order');
  }
});

router.get('/order', (req, res) => {
  res.render('order');
});
router.get('/admin-login', (req, res) => {
  
    res.render('admin-login');
  });
  
  router.post('/admin-login', async (req, res) => {
    try {
      const { adminName, password } = req.body;
  
      const admin = await  Admin.findOne({ adminName });
      if (!admin) {
        return res.status(400).json({ message: 'Invalid admin name or password' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid admin name or password' });
      }
  
      // Set session or JWT token here if needed
  
      res.status(200).redirect('/admin');
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });
  
  // Protected admin page
  function isAuthenticated(req, res, next) {
    // Check if the user is authenticated (e.g., check session or JWT token)
    // This is a placeholder logic; implement actual authentication check
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/admin-login');
    }
  }
  
  router.get('/admin', isAuthenticated, (req, res) => {
    res.render('admin');
  });
  

module.exports = router;

