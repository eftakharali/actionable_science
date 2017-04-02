const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')
const config = require('../config/db')
const FbStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy


module.exports = function(passport) {
  const opts = {}

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = config.secret

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.doc._id, (err, user) => {
      if (err) {
        return done(err, false)
      }

      if (user) {
        return done (null, user)
      } else {
        return done(null, false)
      }
    })
  }))


  passport.serializeUser(function(user, cb) {
    cb(null, user)
  })

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj)
  })


  passport.use(new FbStrategy({
    clientID: '1871643629760705',
    clientSecret: '19f5b263c48dd90b4712f29fe3430cd8',
    callbackURL: 'http://localhost:1000/auth/facebook/callback'
  }, function(accessToken, refreshToken, profile, cb) {
    console.log({profile})
    console.log({accessToken})
    console.log({refreshToken})


    return cb(null, profile)
  }))


  passport.use(new TwitterStrategy({
    consumerKey: 'UrrurMqlkcRnyHAqbKgMFN9rR ',
    consumerSecret: 'o7RDZCnsWDJCQJmJjTrf6VdcniCPVJBvZEN5U3tYZ8nEbGsFxY ',
    callbackURL: 'http://localhost:1000/auth/twitter/callback'
  }, function(accessToken, refreshToken, profile, cb) {
    console.log({profile})
    console.log({accessToken})
    console.log({refreshToken})

    return cb(null, profile)
  }))

}