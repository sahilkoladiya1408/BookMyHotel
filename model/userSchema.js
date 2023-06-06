const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    email : {
        type : String,
        required :true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error ("Email is invalid");
            }
        }
    },
    phone : {
        type : Number,
        required :true,
        validate(value){
            if(999999999>value>9999999999){
                throw new Error("Please enter 10 digit number");
            }
        }
    },
    password : {
        type : String,
        required :true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
});

const User = mongoose.model("User",userSchema);

module.exports = User;