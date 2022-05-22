require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3001;

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))


app.use(express.json())



const productsRouter = require('./controllers/products');
app.use('/products', productsRouter)


app.get("/", (req,res)=>{
  res.send('hello')
})



app.listen(PORT, ()=>{
  console.log(`listening on Port ${PORT}`)
})