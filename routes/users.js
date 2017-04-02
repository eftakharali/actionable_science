const express = require('express'),
      router  = express.Router(),
      passport = require('passport'),
      jwt      = require('jsonwebtoken')

const User = require('../models/user'),
      config = require('../config/db')

router.post('/register', (req, res, next) => {
      const newUser = new User({
            name     : req.body.name, 
            email    : req.body.email,
            username : req.body.username,
            password : req.body.password 
      })

      User.addUser(newUser, (err, user) => {
            if (err) {
                  res.json({success:false, msg: 'Failed to register user'})
            } else {
                  res.json({success: true, msg : 'User registered'})
            }
            
      })
})

router.post('/authenticate', (req, res, next) => {
      const username = req.body.username,
            password = req.body.password

      User.getUserByUserName(username, (err, user)=> {
            if (err) throw err

            if (!user) {
                  return res.json({sucess: false, msg: 'User not found'})
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                  if (err) throw err

                  if (isMatch) {
                        const token = jwt.sign(user, config.secret, {
                              expiresIn: 604800 // 1 week
                        });
                        res.json({
                              success: true,
                              token: 'JWT ' + token,
                              user: {
                                    id: user._id,
                                    name: user.name,
                                    username: user.username,
                                    email: user.email
                              }
                        })


                  } else {
                        res.json({sucess: false, msg: 'Wrong Password'})
                  }
            })
      })

})

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

      res.json({user: req.user})
})

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/callback', passport.authenticate('twitter',{failureRedirect:'/'}), (req, res) =>{
      console.log(res)
      res.redirect('/')
})

router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback', passport.authenticate('twitter',{failureRedirect:'/'}), (req, res) =>{
      console.log(res)
      res.redirect('/')
})

module.exports = router
