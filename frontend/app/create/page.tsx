"use client";

import React, { FormEvent, useState } from 'react'
import Header from '../components/Header'

const createProduct = async (product: { name: string; price: string; image: string }) => {
  try {
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create product.");
    }

    const data = await res.json();
    alert("Product created sucessfully!")
    return { success: true, message: "Product created successfully", data };

  } catch (error: any) {
    alert("Something went wrong!");
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
};

const page = () => {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  const onSubmitEvent = async (e: FormEvent) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.image) {
      console.log("Field Cannot Be Empty.");
    } else {
      // console.log(product);
      const result = await createProduct(product);
    }
    setProduct({ name: "", price: "", image: "" });
    // e.currentTarget.reset();
  }

  return (
    <>
      <Header />
      <div className='section-container'>
        <section className='section'>
          <div className='card bg-base-100 w-96'>
            <h1 className='text-xl'>Create New Product</h1>
            <form action="" onSubmit={onSubmitEvent} className='flex flex-col gap-2 pt-4'>
              <label className="input input-bordered flex items-center gap-2">
                Name
                <input required type="text" className="grow" placeholder="Product Name" value={product.name} onChange={(e) => setProduct({
                  ...product, name: e.target.value
                })} />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Price
                <input required type="number" className="grow" placeholder="299" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Image Link
                <input required type="text" className="grow" placeholder="https://example.com/image" value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} />
              </label>
              <button className='btn'>Add Product</button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default page
