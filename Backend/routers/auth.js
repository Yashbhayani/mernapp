const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../midlewere/fetchuser');

const JWT_SCERET = 'Yashisagoodboy';

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
      })

      const data = {
         user: {
            id: user.id,
            name: user.name
         }
      }

      success = true;
      const authToken = jwt.sign(data, JWT_SCERET);
      res.json({ success, authToken });
   } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occurred");
   }
})

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
