const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db',err)
})


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


app.use('/',authRoutes);

const port = 8000;

app.listen(port , () =>{
    console.log(`server is running on port ${port}`)
})