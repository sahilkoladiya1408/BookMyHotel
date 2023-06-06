const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const userAuthenticate = require("../middleware/userAuthenticate");


router.get("/", (req, res) => {
  res.cookie("jwtoken", "token")
  res.send("hello from the server router js");
});

// ******************************************************************
//               Registration Route for user
// ******************************************************************
router.post("/register", async (req, res) => {
  let { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(400).json({ error: "Plz filled the data" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(422).json({ error: "User already Exist" });
    } else if (password != cpassword) {
      res.status(422).json({ error: "Password are not matching" });
    } else {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const user = new User({ name, email, phone, password});
      await user.save();
      res.status(201).json({ message: "user registration successfully" });
    }
  } catch (error) {
    console.error(error);
  }
});


// ************************************************
//              login Router 
// ************************************************

router.post("/login", async (req,res) => {
  let{email, password} = req.body;

  if (!email || !password) {
      return res.status(422).json({error : "Plz Enter valid credentials"})
  }

  try{
      const userLogin = await User.findOne({email:email});

      if(userLogin){
          const userExistPassword = await bcrypt.compare(password,userLogin.password);
  
          if(userExistPassword){
              res.status(200).json({userLogin});
          }else {
              res.status(422).json({ error: "Plz Enter valid credentials2" });
            }
      }else {
          res.status(422).json({ error: "Plz Enter valid credentials2" }); 
        }

  }catch(err){  
      console.log(err);
  }

});

module.exports = router;