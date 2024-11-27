import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT',"DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); //allows to accept JSON data in req.body

app.use("/api/products",productRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at https://localhost:" + PORT);
})