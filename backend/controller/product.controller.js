import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ sucess: true, data: products });
  } catch (error) {
    console.log("error in fetching products: ", error.message);
    res.status(500).json({ sucess: false, message: "Server Error "});
  }
}

export const createProduct = async (req, res) => {
  const product = req.body; //data sent by user

  if(!product.name || !product.price || !product.price) {
    return res.status(400).json({ sucess: false, message: "Please provide all fields. "});
  }

  const newProduct = new Product (product)

  try {
    await newProduct.save();
    res.status(201).json({ sucess: true, data: newProduct});
  } catch (error) {
    console.error("Error in Creating Product: ", error.message);
    res.status(500).json({ sucess: false, message: "Server Error"});
  }

}

export const updateProduct =  async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({sucess:false, message:"Invalid Product Id"}); 
  }
  
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
    res.status(200).json({ sucess: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
}

export const deleteProduct = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({sucess:false, message:"Invalid Product Id"}); 
  }
  
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleting product: ", error.message);
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
}