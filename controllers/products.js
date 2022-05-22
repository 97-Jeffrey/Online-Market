const express = require('express');
const router = express.Router();
const Product  = require('../models/product')

//get all
router.get("/", async (req,res)=>{
  
  try{
    const products = await Product.find()
    res.json(products);
  }
  catch(err){
    res.status(500).json({ message:err.message })
  }
  
})


//get one
router.get("/:id", getProduct, async (req,res)=>{


  res.json(res.product)
  
})

//create a product
router.post('/', async (req,res)=>{

  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  })

  try{

    const newProduct = await product.save();
    res.status(201).json(newProduct)
  }catch(err){
     res.status(400).json({message: err.message})
  }

})

//update a product

router.patch('/:id', getProduct, async (req,res)=>{

  if(req.body.name !=null) {res.product.name = req.body.name}
  if(req.body.category !=null) {res.product.category = req.body.category}
  if(req.body.description !==null) {res.product.description = req.body.description}
  if(req.body.price !=null){ res.product.price = req.body.price}
  if(req.body.image !=null){ res.product.image = req.body.image}
  
  try{

    const updatedProduct = await res.product.save();
    res.json(updatedProduct)

  }catch(err){
     res.status(400).json({ message: err.message })
  }
  
})


//delete a product
router.delete('/:id',getProduct, async (req,res)=>{
  
  try{
     await res.product.remove();
     res.json({ message: "product deleted"})
  }
  catch(err){
    res.status(500).json({ message: err.message})
  }
})


async function getProduct(req,res, next){
  let product;
  
  try{
    product = await Product.findById(req.params.id);
    if(product == null) {
      return res.status(404).json({ message: "Cannot find subscriber"})
    }
  }
  catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()


}


module.exports = router;