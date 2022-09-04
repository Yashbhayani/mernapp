const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../midlewere/fetchuser');

const JWT_SCERET = 'Yashisagoodboy';

//Router:-1 
//Create a using: POST Add user data
router.post('/createuser', [
   body('name', 'Enter a Valid Name').isLength({ min: 3 }),
   body('email', 'Enter a Valid Email').isEmail(),
   body('password', 'Password must be atleast 8 characters').isStrongPassword({ min: 8 })
], async (req, res) => {
   let success = false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
   }

   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         success = false;
         return res.status(400).json({ error: "Sorry a user with email alredy exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass
         // password: req.body.password
      })
      /*.then((user) => { console.log(user) })
         .catch((err) => {
            console.error(err)
            res.json({
               errors: 'Please enter a unique value for email',
               message: err.message
            })
         });*/

      const data = {
         user: {
            id: user.id
         }
      }

      success = true;
      const authToken = jwt.sign(data, JWT_SCERET);
      //res.json(user);
      res.json({ success, authToken });
   } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occurred");
   }
   /*
   res.json("data added successfully");   
   let { name, email, password } = req.body;
      const user = new User({ name: name, email: email, password: password });
      await user.save();
      res.send(user);*/
})


//Router:-2
//Authentication  a user
router.post('/login', [
   body('email', 'Enter a Valid Email').isEmail(),
   body('password', 'Password can not be empty').isStrongPassword({ min: 8 })

], async (req, res) => {
   let success = false;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   } else {
      const { email, password } = req.body;
      try {
         let user = await User.findOne({ email });
         if (!user) {
            success = false;
            return res.status(400).json({ errors: "Sorry user does not exist." });
         }
         const passeordcompare = await bcrypt.compare(password, user.password);
         if (!passeordcompare) {
            return res.status(400).json({ errors: "Please try to login with correct candidate." });
         }

         const data = {
            user: {
               id: user.id,
               name: user.name,
            }
         }

         const authToken = jwt.sign(data, JWT_SCERET);
         success = true;
         res.json({ success, authToken });
      } catch (err) {
         console.error(err.message);
         res.status(500).send("Intranal server Errored");
      }
   }
});

//Router:-3
//get login user details using 
router.post('/getUser', fetchUser, async (req, res) => {
   try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Intranal server Errored");
   }
})

module.exports = router;