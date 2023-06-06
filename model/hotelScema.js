const mongoose = require("mongoose");

const hotelShema = mongoose.Schema({
    hname : {
        type : String,
    },
    haddress : {
        type : String,
    },
    hcity : {
        type : String,
    },
    hdetails : {
        type :String,
    },
    hprice : {
        type : Number,
    },
    himages : {
        type : String,
    }
});

const Hotel = mongoose.model("Hotel",hotelShema);

module.exports = Hotel;