const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors());

mongoose
  .connect("mongodb://localhost/jwt")
  .then(() => console.log("connected"));

const dbdata = require("./src/schema");

const verifyJWT = (req, res, next) => {
  console.log("////");
  console.log(req.headers["x-access-token"]);
  console.log("////");
  const token = req.headers["token"]?.split(" ")[1];
  //const token = req.headers.token.split(" ")[1];
  //const token = req.headers.token;
  console.log(req.headers);
  if (token) {
    console.log(token);
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });
      } else {
        console.log("success");
        req.user = {};
        req.user.id = decoded.id;
        req.user.name = decoded.name;
        next();
      }
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

app.get("/", (req, res) => {
  res.send("server on");
});

app.get("/all", async (req, res) => {
  const data = await dbdata.find();
  console.log(data);
  res.json(data);
});

app.post("/register", async (req, res) => {
  const cryptedPassword = await bcrypt.hash(req.body.password, 10);
  const takenEmail = await dbdata.findOne({ email: req.body.email });
  if (takenEmail) {
    res.json({
      message: "Email has already been taken",
    });
  } else {
    res.json({
      message: "You may proceed",
    });
    const totalUser = await dbdata.find();
    const user = await dbdata.create({
      id: totalUser.length + 1,
      email: req.body.email,
      name: req.body.name,
      password: cryptedPassword,
    });
    await user.save();
  }

  console.log(req.body.name);
  console.log(req.body.email);
  console.log(cryptedPassword);
});

app.post("/login", async (req, res) => {
  const findUser = await dbdata.findOne({ email: req.body.email });
  if (!findUser) {
    res.json({
      message: "Email not found",
    });
  } else {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (checkPassword) {
      const payload = {
        id: findUser._id,
        name: findUser.name,
      };
      jwt.sign(payload, "secret", { expiresIn: 86400 }, (err, token) => {
        if (err) {
          res.json({ message: err });
        } else {
          res.json({ message: "Success", token: "Bearer " + token });
        }
      });
    } else {
      res.json({ message: "Your password is incorrect" });
    }
  }
});

app.get("/username", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, name: req.user.name });
});

app.listen(4000);
