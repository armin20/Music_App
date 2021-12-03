const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv");

dotenv.config();

const userService = require("./user-service.js");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
const option = { expiresIn: process.env.JWT_EXPIRES_IN || "1h" };

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

jwtOptions.secretOrKey = process.env.JWT_SECRET;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);

  if (jwt_payload) {
    next(null, { _id: jwt_payload._id, userName: jwt_payload.userName });
  } else {
    next(null, false);
  }
});
passport.use(strategy);

app.use(passport.initialize());

app.use(express.json());
app.use(cors());

app.post("/api/user/register", (req, res) => {
  userService
    .registerUser(req.body)
    .then((result) => res.json({ message: result }))
    .catch((err) => {
      res.status(422).json({ message: err });
    });
});

app.post("/api/user/login", (req, res) => {
  userService
    .checkUser(req.body)
    .then((user) => {
      let payload = {
        _id: user._id,
        userName: user.userName,
      };

      var token = jwt.sign(payload, jwtOptions.secretOrKey, option);

      res.json({ message: "login successful", token: token });
    })
    .catch((err) => {
      res.status(422).json({ message: err });
    });
});

app.get(
  "/api/user/favourites",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .getFavourites(req.user._id)
      .then((result) => res.json(result))
      .catch((err) => res.status(422).json({ message: err }));
  }
);

app.put(
  "/api/user/favourites/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "error" });
    } else {
      userService
        .addFavourite(req.user._id, req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json({ message: err }));
    }
  }
);

app.delete(
  "/api/user/favourites/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userService
      .removeFavourite(req.user._id, req.params.id)
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json({ message: err }));
  }
);

userService
  .connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("API listening on: " + HTTP_PORT);
    });
  })
  .catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
  });
