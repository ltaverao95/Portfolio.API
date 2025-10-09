import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.GOOGLE_SIGN_IN_URL_CALLBACK}`,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log("Google profile:", profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
