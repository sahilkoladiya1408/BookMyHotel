const express = require("express");
const router = express.Router();
const Hotel = require("../model/hotelScema");
const Booking = require("../model/bookingSchema");

// ******************************************************************
//                          Add Hotel Route
// ******************************************************************

router.post("/addhotel", async (req, res) => {
  let { hname, hphone, haddress, hcity, hdetails, hprice, himages } = req.body;

  if (!hname || !haddress || !hcity || !hdetails || !hprice || !himages) {
    return res.status(400).json({ error: "Plz filled the data" });
  }

  try {
    const hotelExist = await Hotel.findOne({ hname: hname });
    if (hotelExist) {
      res.status(422).json({ error: "User already Exist" });
    } else {
      const hotel = new Hotel({
        hname,
        haddress,
        hcity,
        hdetails,
        hprice,
        himages,
      });
      await hotel.save();
      res.status(201).json({ message: "Hotel Add Successfully" });
    }
  } catch (error) {
    console.error(error);
  }
});

// ******************************************************************
//                          get Hotels Route
// ******************************************************************

router.get("/getHotels", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    if (!hotels) {
      return res.status(400).json({ error: "hotels not found!" });
    }
    return res.status(201).json({ hotels });
  } catch (error) {
    console.log(error);
  }
});

// ******************************************************************
//                          get Hotels Route
// ******************************************************************

router.post("/bookhotel", async (req, res) => {
  let { hotel_Id, user_Id, check_in, check_out, rooms, price } = req.body;

  if (!hotel_Id || !user_Id || !check_in || !check_out || !rooms || !price) {
    return res.status(400).json({ error: "Plz filled the data" });
  }

  try {
    const booking = new Booking({
      hotel_Id,
      user_Id,
      check_in,
      check_out,
      rooms,
      price,
    });
    await booking.save();
    res.status(201).json({ message: "Booking Success Fully" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
