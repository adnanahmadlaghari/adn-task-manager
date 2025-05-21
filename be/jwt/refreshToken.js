const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const User = require("../model/user");
require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromBodyField("refresh_token"),
  secretOrKey: process.env.REFRESH_SECRET_KEY,
};

passport.use(
  "jwt-refresh",
  new JwtStrategy(options, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
