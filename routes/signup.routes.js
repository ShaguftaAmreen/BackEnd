require("dotenv").config();
const express = require("express");
const signUpModel = require("../models/signupSchema");

const router = express.Router(); 

router.post("/signup", async (req, res) => { 
  const { name, email, password, confirmpassword } = req.body;

  if (!name || !email || !password || !confirmpassword) {
    return res.status(400).send("All fields are required.");
  }

  if (password !== confirmpassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    const signup = new signUpModel({ name, email, password });
    await signup.save();
    res.status(201).send(`User ${name} signed up successfully!!`);
  } catch (error) {
    res.status(500).send(`Error signing up: ${error.message}`);
  }
});

module.exports = router; 
