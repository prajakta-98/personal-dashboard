const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/users");

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({name, email, password:hasedPassword});

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token =jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({
            token,
            user: { id: user._id }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.error("Error logging in user:", error);
    }
});
module.exports = router;
