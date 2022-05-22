const mongoose = require('mongoose');

const prodcutSchema =  new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  category:{
    type:String,
    required:true
  },

  description:{
    type: String,
    required:false
  },

  price:{
    type:Number,
    required:true
  },

  image:{
    type:String,
    required:true
  },

  datePosted:{
    type:Date,
    required:true,
    default:Date.now
  }
})

module.exports = mongoose.model('Product', prodcutSchema)