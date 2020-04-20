const Admin = require("../model/admin");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// strategy to verify username and password
const LocalStrategy = require("passport-local");

// strategy to verify the access token
const JwtStrategy = require("passport-jwt").Strategy;

// this is a helper to extract the info from the token
const ExtractJwt = require("passport-jwt").ExtractJwt;

// This strategy will be used when we ask passport to passport.authenticate("local")
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
passport.use(new LocalStrategy(Admin.authenticate()));

const jwtOptions = {
  //Authorization: Bearer TOKEN
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_PASSWORD,
};

// This strategy will be used when we ask passport to passport.authenticate("jwt")
passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, callback) => {
    //looks into the collection
    Admin.findById(jwtPayload._id, (err, user) => {
      // Something went wrong getting the info from the db
      if (err) return callback(err, false);
      // Existing user, all right!
      else if (user) return callback(null, user);
      // Non existing user
      else return callback(null, false);
    });
  })
);

module.exports = {
  // A helper to generate token
  getToken: (user) =>
    jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: 60 * 60 * 24 * 7 }),
};
