require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// CORS options
const corsOptions = {
  origin: 'https://mern-stack-notes.vercel.app',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Ensure you allow 'Authorization' header
  credentials: true, // If you are using cookies or authentication that needs credentials
};

// Apply CORS globally
app.use(cors(corsOptions));

// Ensure Express handles preflight requests automatically
app.options('*', cors(corsOptions))
// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })