import React, { useState, useEffect } from 'react';
// import ProductCtard from './Product-Page-Component/ProductCard';
import axios from 'axios';
import "./Search.css"
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';

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

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log(products);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProducts(value);
  };

  const searchProducts = (searchTerm: string) => {
    const results = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };
  console.log(searchResults);
  

  return (
    <div className='app'>
    <Navbar/>
      <div className="ContainerSearch">
        <div className='searchBox'>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search products..."
          />
          <p style={{ textAlign: "left" }}>{searchResults.length} Result Shown</p>
        </div>
        <div className='productSection'>
          <div className="ProdContainer">
            <div className="gridlayout">
            {searchResults.map((item) => (
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
      </div>
    </div>
  );
};

export default Search;