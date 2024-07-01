const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Admin, Order, Table } = require('./users'); // Ensure the path to your User model is correct

const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/rahul', (req, res) => {
  res.render('rahul');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already exists');
      return res.redirect('/signup');
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).redirect('/login');
  } catch (error) {
    console.error('Error creating user:', error);
    req.flash('error', 'Error creating user');
    res.status(500).redirect('/signup');
  }
});

// Login POST request
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    req.session.user = { email };
    res.redirect('/order');
  } catch (error) {
    console.error('Error logging in user:', error);
    req.flash('error', 'Error logging in user');
    res.status(500).redirect('/login');
  }
});

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup', { messages: req.flash('error') });
});

// Render login page
router.get('/login', (req, res) => {
  res.render('login', { messages: req.flash('error') });
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/order', async (req, res) => {
  try {
    const { username, date, hours, phoneNumber, email, paymentMethod } = req.body;

    // Check if an order with the same username, date, and hours already exists
    const existingOrder = await Order.findOne({ username, date, hours });
    if (existingOrder) {
      return res.json({ success: false, message: 'An order with this username, date, and hours already exists.' });
    }

    const newOrder = new Order({
      username,
      date,
      hours,
      phoneNumber,
      email,
      paymentMethod
    });
    await newOrder.save();

    // Redirect to the user page with the username as a query parameter
    res.redirect(`/userpage?username=${encodeURIComponent(username)}`);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'An error occurred while placing the order' });
  }
});

router.get('/order', (req, res) => {
  res.render('order');
});

router.get('/userpage', async (req, res) => {
  try {
    const username = req.query.username;

    // Find the order by username
    const order = await Order.findOne({ username });

    if (!order) {
      return res.status(404).json({ success: false, message: 'No order found for this user.' });
    }

    // Find all tables
    const tables = await Table.find();

    // Render the userpage.ejs and pass the order data and tables
    res.render('userpage', {
      order,
      tables
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the user data' });
  }
});

router.get('/admin-login', (req, res) => {
  res.render('admin-login');
});

router.post('/admin-login', async (req, res) => {
  try {
    const { adminName, password } = req.body;
    const admin = await Admin.findOne({ adminName });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid admin name or password' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid admin name or password' });
    }
    // Set session or JWT token here if needed
    res.status(200).redirect('/admin-dashboard');
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

router.get('/admin-dashboard', (req, res) => {
  res.render('admin-dashboard');
});

router.post('/add-table', async (req, res) => {
  try {
    const { tableNumber } = req.body;
    const newTable = new Table({ tableNumber });
    await newTable.save();
    res.redirect('/admin-dashboard');
  } catch (error) {
    console.error('Error adding table:', error);
    res.status(500).json({ message: 'Error adding table', error });
  }
});

router.post('/update-table', async (req, res) => {
  try {
    const { tableNumber, available } = req.body;
    await Table.updateOne({ tableNumber }, { available: available === 'true' });
    res.redirect('/admin-dashboard');
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ message: 'Error updating table', error });
  }
});

module.exports = router;
