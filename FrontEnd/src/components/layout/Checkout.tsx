
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Checkout.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


interface CartItem {
    user_id: number;
    product_name: string;
    product_image: string;
    color: string;
    quantity: number;
    price: number;
    cartId: number;
  }
const Checkout = () => {
    const [cartData, setCartData] = useState<CartItem[]>([]);
  const user: any = JSON.parse(localStorage.getItem("user") || "{}");
  const Id = user.user_id
  const loadData = async () => {
    await axios
      .get(`http://localhost:8000/cart/${Id}`)
      .then((res) => {
        setCartData(res.data.cart);
        console.log(res.data);
        
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  console.log(cartData);
    return (
        <div className='app'>
            <Navbar/>
            <div className="ContainerCheckout">
                <div className="layout-content">
                    <div className="main-content">
                        <span>WHERE DO YOU WANT TO RECEIVE YOUR ORDER?</span>
                        <div className="delivery-group-head" style={{marginTop:'20px'}}>
                            <div>
                                <p><AccountBalanceIcon /></p>
                                <div>Home</div>
                            </div>
                            <div>
                                <p><AccountBalanceIcon /></p>
                                <div>Zara Store

                                </div>

                            </div>
                        </div>
                        <div className="delivery-address">
                            <span>Address</span>
                            <span>EDIT</span>

                        </div>
                        <div className="delivery-group">
                            <h2>ITEMS</h2>
                            <div className="checkoutDeliverypro">
                                {cartData.map((item) => (
                                    <img src={item.product_image} alt="" />

                                ))}
                            </div>
                        </div>
                        <div className="delivery-details">
                            <hr />
                            <div>
                                <div>

                                    <div className="delivery-details-address">
                                        <div> <b>
                                            THURSDAY 06, OCTOBER - FRIDAY 07, OCTOBER</b>
                                        </div>
                                        <div>
                                            FREE SHIPPING FOR ORDERS OVER VND 69,969
                                        </div>
                                        <br />
                                        <div>
                                            DELIVERY TIME FRAMES
                                        </div>
                                    </div>
                                </div>
                                <div className="delivery-free">
                                    FREE
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="bottom-btn">
                            <p>SHIPPING FREE</p>
                            <Link to="/paymentMethod"><button className="bottom-btn-link">CONTINUE</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
    }
export default Checkout