const mongoose = require("mongoose");
// const DB = process.env.DATABASE;
const DB = "mongodb://127.0.0.1:27017/Hotel_Book";

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });
