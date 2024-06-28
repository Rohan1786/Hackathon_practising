var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./users'); // Ensure the path to your User model is correct

const saltRounds = 10;

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username,email, password} = req.body;

    const existingUser = await User.findOne({ username,email});
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username,email, password:hashedPassword});

    await newUser.save();
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

// Login route (You can add the login route here)




// Login route
router.get('/login',(req,res)=>{
  res.render('login')
})
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
