require('dotenv').config()
const express = require('express')
const app = express()
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING } = process.env
const authCtrl = require('./controllers/authController')

app.use(express.json())

//TODO Set up session
//TODO - Modify auth functions to use session
//TODO Build useful middleware
//TODO - Auth middleware
//TODO - User specific information
//TODO - User tracking

//* Auth endpoints
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.delete('/auth/logout', authCtrl.logout)

//! Seeding endpoint.  Keep at bottom.
app.post('/api', authCtrl.seed)

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set('db', db)
  console.log('DB checking in')
  app.listen(SERVER_PORT, () => console.log(`Get it on port ${SERVER_PORT}`))
})
