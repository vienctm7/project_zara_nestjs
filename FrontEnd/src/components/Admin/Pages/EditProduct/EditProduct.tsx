import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import AppHeader from "../../Components/AppHeader";


interface Product {
  brand_id: number;
  category_id: number;
  price: number;
  product_image: string;
  product_name: string;
  product_stocks: number;
  description: string;
  care: string;
  sold: number;
  // Add other fields from your product data
}

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    brand_id: 0,
    category_id: 0,
    price: 0,
    product_image: "",
    product_name: "",
    product_stocks: 0,
    description: "",
    care: "",
    sold: 0,
  });
  const {
    product_image,
    product_name,
    description,
    price,
    care,
    brand_id,
    product_stocks,
    category_id,
  } = product;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  console.log(product);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/products/${id}`, product);
    notification.success({
      message:"update thành công"
    })
    setTimeout(() => {
      navigate("/adminCourse");
    }, 2000);
  };

  const loadUser = async () => {
    const result = await axios.get(
      `http://localhost:8000/products//${id}`
    );
    setProduct(result.data.data[0]);
  };

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className="">
      <AppHeader/>
      <div >
      <div className="w-75 mx-auto shadow p-5">
        <h3>Add Product</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor=""> Product_image: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your image product"
            value={product_image}
            name="product_image"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Product_name: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your product_name"
            value={product_name}
            name="product_name"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Description: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your description"
            value={description}
            name="description"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Price: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter products price"
            value={price}
            name="price"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Care: </label>
          <br />
          <input
            type="text"
            placeholder="Enter product care"
            value={care}
            className="form-control"
            name="care"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Brand_id: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your brand_id"
            value={brand_id}
            name="brand_id"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Product_stocks: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter  product_stocks"
            value={product_stocks}
            name="product_stocks"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Category_id: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter category_id"
            value={category_id}
            name="category_id"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
    </div>


  );
}

export default AddProduct;
