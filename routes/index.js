const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Admin, Order, Table } = require('./users');
const moment = require('moment'); // Ensure the path to your User model is correct
const path =require('path');
const fs=require('fs')
const multer=require('multer')
const saltRounds = 10;


router.get('/home', async (req, res) => {
  try {
    // Fetch distinct food categories and area categories from the Admin collection
    const foodCategories = await Admin.distinct('FoodCategory');
    const areaCategories = await Admin.distinct('AreaCategory');

    // Prepare query based on selected food and area categories
    const query = {};
    if (req.query.foodCategory) {
      query.FoodCategory = req.query.foodCategory;
    }
    if (req.query.areaCategory) {
      query.AreaCategory = req.query.areaCategory;
    }

    // Fetch restaurants based on the query
    const restaurants = await Admin.find(query);

    res.render('home', {
      foodCategories,
      areaCategories,
      restaurants
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/',(req,res)=>{
  res.render('index')
})
// Handle search requests
router.get('/search', async (req, res) => {
  try {
    const { FoodCategory, AreaCategory } = req.query;

    // Fetch distinct food categories and area categories for the form
    const foodCategories = await Admin.distinct('FoodCategory');
    const areaCategories = await Admin.distinct('AreaCategory');

    // Find restaurants based on the selected food category and area category
    const filter = {};
    if (FoodCategory) filter.FoodCategory = FoodCategory;
    if (AreaCategory) filter.AreaCategory = AreaCategory;

    const restaurants = await Admin.find(filter);

    res.render('home', {
      foodCategories,
      areaCategories,
      restaurants
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/rahul', (req, res) => {
  res.render('rahul');
});
router.get('/admin-register', (req, res) => {
  res.render('admin-register');
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

router.get('/admin-dashboard', async (req, res) => {
  try {
    const orders = await Order.find().lean();
    res.render('admin-dashboard', { orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
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
router.get('/hi',(req,res)=>{
  res.render('chatbot')
});

router.post('/delete-order', async (req, res) => {
  try {
    const { orderId } = req.body;
    await Order.findByIdAndDelete(orderId);
    res.redirect('/admin-dashboard');
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error });
  }
});
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle the registration form submission
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads

// Directory to save uploaded files

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Register route
router.post('/register', upload.single('image'), async (req, res) => {
    try {
        const { adminName, password, Res, Address, FoodCategory, AreaCategory } = req.body;
        const image = req.file.path;

        const newAdmin = new Admin({
            adminName,
            password,
            Res,
            Address,
            FoodCategory,
            AreaCategory,
            image
        });

        await newAdmin.save();

        res.redirect('/'); // Redirect to home page or wherever needed after successful registration
    } catch (err) {
        console.error(err);
        res.render('register', { errorMessage: 'Failed to register. Please try again.' }); // Render the registration page with an error message
    }
});


// Register route
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    const { adminName, password, Res, Address, FoodCategory, AreaCategory } = req.body;
    const image = req.file.path; // Path to the uploaded image

    const newAdmin = new Admin({
      adminName,
      password,
      Res,
      Address,
      FoodCategory,
      AreaCategory,
      image
    });

    await newAdmin.save();

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

//for payment 
router.get('/pay',(req,res)=>{
  res.render('pay')
})

module.exports = router;
