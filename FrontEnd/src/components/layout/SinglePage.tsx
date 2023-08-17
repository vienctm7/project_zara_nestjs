import React, { useEffect } from "react";
import { useState } from "react";
import "./SinglePage.css"
import "./ProductPage.css"
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import { useTheme } from "@mui/material/styles";
import ProductPage from "./ProductPage";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Button} from "react-bootstrap";
import Navbar from "./Navbar";
import { notification } from "antd";

interface SinglePageProps {}

const SinglePage: React.FC<SinglePageProps> = () => {
  const navigate = useNavigate();
  //------------------drawer components------------//
  const theme = useTheme();
  const [opend, setOpend] = React.useState<boolean>(false);

  const handleDrawerClose = () => {
    setOpend(false);
  };
  //-----------------------------------------------------//

  const [size, setSize] = useState<boolean>(false);
  const [sizeval, setSizeval] = useState<string>("");

  const { id } = useParams<{ id: string }>();

  const [single, setSingle] = useState<any>({});

  // API lấy thông tin một sản phảm theo id
  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/products/details/${id}`);
      setSingle(response.data.findProduct || {});
      
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  console.log("1",single);
  
  // Lấy thông tin user trên local
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // const cartId = uuidv4();
  const newCart = {
    // cartId: cartId,
    product_id: single.product_id,
    user_id: user.user_id,
    quantity: 1,
  };
  console.log(newCart);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (sizeval === "") {
      notification.error({
        message:"Please Select A size"
      })
    } else {
      notification.success({
        message:"Sản phẩm đã được thêm vào giỏ hàng!"
      });
      setSize(true);
      setOpend(true);
      try {
        await axios.post("http://localhost:8000/cart", newCart);
        navigate("/cart");
      } catch (err) {
        console.log("â đây rồi");
        
        console.log(err);
      }
    }
  };

  return (
    <div className="app">
         <Navbar/>
      <div className="main">
        <div className="leftall">
          <div className="leftdiv">
            <h4 style={{ marginBottom: "30px" }}>MATERIALS, CARE AND ORIGIN</h4>
            <h5 style={{ marginBottom: "30px" }}>MATERIALS</h5>
            <p style={{ marginBottom: "30px" }}>{single?.description}</p>
            <p style={{ marginBottom: "30px" }}>
              To assess compliance, we have developed a programme of audits and
              continuous improvement plans.
            </p>
            <h5>{single.materialshell}</h5>
            <p style={{ marginBottom: "30px" }}>{single?.materialtype}</p>
            <h5 style={{ marginBottom: "30px" }}>CARE</h5>
            <p style={{ marginBottom: "30px" }}>{single?.care}</p>
            <h5 style={{ marginBottom: "30px" }}>ORIGIN</h5>
            <p style={{ marginBottom: "30px" }}>{single?.origin}</p>
          </div>
        </div>
        <div
          className="middleall"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="middlediv1">
            <img src={single?.product_image} alt="" />
          </div>
          <div className="middlediv2">
            <img src={single?.product_image} alt="" />
          </div>
        </div>
        <div className="rightall">
          <div className="rightdiv">
            <h4 style={{ marginBottom: "40px" }}>
              {single?.name || single?.product_name}
            </h4>
            <p style={{ marginBottom: "40px" }}>{single?.desc}</p>
            <p style={{ marginBottom: "40px" }}>{single?.color}</p>
            <p>{single?.price}</p>
            <p style={{ marginBottom: "40px" }}>MRP incl. of all taxes</p>
            <div id="size">
              <select
                className="selectsize"
                value={sizeval}
                onChange={(e) => setSizeval(e.target.value)}
              >
                <option>Select A Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginBottom: "40px",
              }}
            >
              <p>FIND YOUR SIZE</p>
              <p>SIZE GUIDE</p>
            </div>
            <Button className="addbutton menu-btn"
              style={{ marginBottom: "50px" }}
              onClick={handleClick}>ADD TO CART</Button>
            <p style={{ marginBottom: "40px", fontSize: "12px" }}>
              CHECK IN-STORE AVAILABILITY
            </p>
            <p style={{ marginBottom: "40px", fontSize: "12px" }}>
              DELIVERY,EXCHANGES AND RETURNS
            </p>
          </div>
        </div>
      </div>
      {/* matchwith section  */}
      {/* <div className="matchwith" style={{ width: "95%", margin: "auto" }}>
        <h3 style={{ marginBottom: "-150px" }}>MATCH WITH</h3>
        <ProductPage  />
      </div> */}
      <Footer />
    </div>
  );
};

export default SinglePage;