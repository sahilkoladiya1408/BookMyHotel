const express = require("express");
const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");

dotenv.config({path: "./config.env"});

require("./db/conn");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(bodyParser.json());

app.use(require("./router/userRouter"));
app.use(require("./router/hotelRouter"));

const port = process.env.PORT;

app.get("/" , (req,res) => {
    res.send("Hello ! This is Back End");
});

app.listen(port , () =>{
    console.log(`Server is start at ${port}`);
}); 