"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Header from "./components/Header";
import { title } from "process";

const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Page = () => {
  const [products, setProducts] = useState([{}]);
  const [edit, setEdit] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    id: "",
    name: "",
    price: "",
    image: "",
  })

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (!res.ok) {
        alert("Someting went wrong!");
        return 0;
      }
      alert("Product deleted sucessfully!");
    } catch (error) {
      alert("Something went wrong! ");
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.data);
    };

    fetchProducts();
  }, [handleDelete]);


  const handleEdit = (
    id: string,
    name: string,
    price: string,
    image: string,
  ) => {

    // console.log(`http://localhost:5000/api/products/${id}`);
    // console.log(id);
    setUpdatedProduct({ ...updatedProduct, id: id, name: name, price: price, image: image });
    // console.log(updatedProduct);

    // console.log(id, name, price, image);


    // const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedProduct),
    // })

    setEdit(!edit);
    // console.log(edit);
  }

  const handleUpdate = async () => {

    // console.log(updatedProduct);
    // console.log(updatedProduct.id);

    const res = await fetch(`http://localhost:5000/api/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })

    if (!res.ok) {
      alert("Something went wrong");
    } else {
      // alert("Product edited sucessfully");
    }

    setEdit(!edit);
  }

  return (
    <>
      <Header />
      <div className="section-container">
        <section className="section">
          <h1 className="text-xl py-4">All Products</h1>
          <div className="grid gap-8 w-full lg:grid-cols-2 sm:grid-col-1">

            {products.map((product) => (
              <Card key={product._id} {...product} handleDelete={handleDelete} handleEdit={handleEdit} />
            ))}

            {edit && <Edit
              setEdit={setEdit}
              edit={edit} {...updatedProduct}
              updatedProduct={updatedProduct}
              setUpdatedProduct={setUpdatedProduct}
              handleUpdate={handleUpdate} />}
            {/* <Edit setEdit={setEdit} edit={edit} /> */}

          </div>

        </section>
      </div>
    </>
  );
};

const Card = (
  props: {
    _id: string
    name: string,
    price: string,
    image: string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string, name: string, price: string, image: string) => void,
  }) => {

  const { _id, name, price, image, handleDelete, handleEdit } = props;

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={image}
            alt={name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Price: ${price}</p>
          {/* <p>id: {_id}</p> */}
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => handleEdit(_id, name, price, image)}>Edit</button>
            <button className="btn btn-primary" onClick={() => handleDelete(_id)}>Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}


const Edit = (props: {
  id: string;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  name: string;
  price: string;
  image: string;
  updatedProduct: { name: string, price: string, image: string };
  setUpdatedProduct: (id: object) => void;
  handleUpdate: (id: string) => void;
}) => {

  const { id, setEdit, edit, name, price, image, updatedProduct, setUpdatedProduct, handleUpdate } = props;

  return (
    <>
      <div className="w-screen h-screen backdrop-blur-sm bg-[#80808068] fixed top-0 left-0"></div>
      <div className='card bg-base-100 w-96 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-4'>
        <h1 className='text-xl'>Edit Product</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(id);
          }}
          className='flex flex-col gap-2 pt-4'>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              required
              type="text"
              className="grow"
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Price
            <input
              required
              type="number"
              className="grow"
              placeholder="299"
              value={price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Image Link
            <input
              required
              type="text"
              className="grow"
              placeholder="https://example.com/image"
              value={image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              } />
          </label>
          <div className="flex flex-row w-full gap-2 items-centerjustify-center">
            <button className='btn w-[48%]' onClick={() => { setEdit(!edit); }}>Cancel</button>
            <button className='btn w-[48%]' type="submit" >Update Product</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Page;
