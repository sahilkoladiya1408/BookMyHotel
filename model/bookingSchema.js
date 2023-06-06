const mongoose = require("mongoose");

const bookingShema = mongoose.Schema({
    hotel_Id : {
        type : String
    },
    user_Id : {
        type : String
    },
    check_in : {
        type : Date
    },
    check_out : {
        type : Date
    },
    rooms : {
        type : Number
    },
    price : {
        type : Number
    }
});

const Booking = mongoose.model("Booking",bookingShema);

module.exports = Booking;