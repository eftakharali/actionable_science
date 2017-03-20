const express = require('express'),
      path    = require('path'),
      bodyParser  = require('body-parser'),
      cors        = require('cors'),
      mongoose   = require('mongoose'),
      passport    = require('passport')

const config = require('./config/db') 

const port = 1000

//connect to database
mongoose.connect(config.database)

mongoose.connection.on('connected', () => {
  console.log('Connected to database' + config.database)
})

mongoose.connection.on('error', (err) => {
  console.error('Database error' + err)
})

const app = express()

const users = require('./routes/users')

// CORS Middleware
app.use(cors())
// body parser Middleware

//app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

//passprt Middleware
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use('/users', users)

//index routes
app.get('/',(req, res) => {
  res.send('Invalid EndPoint')
})

// start serer
app.listen(port, ()=> {
  console.log('Server started at port', port)
})
