const express = require("express");
const authRoutes = require("./routes/Auth");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

console.log(process.env.MONGODB_URI);
mongoose
  .connect(
    "mongodb+srv://Ayinla:Hucrux0327@cluster0.em93uoi.mongodb.net/Account?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((responce) => {
    app.listen(4000, () => {
      console.log("Fire on 🚀🔥");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
