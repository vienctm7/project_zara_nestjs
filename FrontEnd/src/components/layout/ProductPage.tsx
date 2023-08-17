import React, { useState, useEffect } from 'react';
import axios from "axios";
// import ProductCard from './ProductCard';
import "./ProductPage.css"
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  product_image :string;
  materialdesc: string; 
  materialtype: string ;
  description :string ;
  origin: string ;
  color :string
  // Add other fields from your product data
}

const ProductPage: React.FC = () => {


  const [products, setProducts] = useState<Product[]>([]);
  
  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      setProducts(response.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  console.log("xx",products);
  
  return (
    <div className='app'>
      <Navbar/>
          <div className='ProdContainer'>
      <div className="gridlayout">
        {products.map((item) => (
        <div className="ProductCardContainer" key={item.product_id}>
        {/* image */}
        <Link to={`/products/details/${item.product_id}`}>
          <div>
            <img
              style={{ width: "100%", minHeight: "300px" }}
              src={item.product_image}
              alt={item.product_name}
            />
          </div>
        </Link>
        {/* <div style={{ marginTop: "-50px", textAlign: "center" }}>
          <AddCart id={productId} data={item} />
        </div> */}
        {/* details */}
        <div className="flexStyling">
          <div className="nameStyling">
            <Link to={`/products/details/${item.product_id}`}>
              <div>{item.product_name}</div>
            </Link>
          </div>
          <div className="priceS">{item.price}</div>
        </div>
      </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default ProductPage;