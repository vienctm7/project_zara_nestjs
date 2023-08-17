import React from 'react'
import { useEffect, useState } from 'react';
import "./PaymentMethod.css"
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
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
const PaymentMethod = () => {
    
    const navigate = useNavigate();
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
            <div className='ContainerPaymentMethod'>
                <div className='layout-content'>
                    <h4>CHOOSE A PAYMENT METHOD</h4>
                    <p>Please note that only cards that use 3D Secure are accepted. Contact your bank to activate it or for further instructions.</p>
                    <div className="card-description">
                        <div className="card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/icon-payment-visa.svg" alt="" />
                            <p>VISA</p>
                        </div>
                        <div className="card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/icon-payment-mastercard.svg" alt="" />
                            <p>MASTERCARD</p>
                        </div>
                        <div className="card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/icon-payment-amex_2.svg" alt="" />
                            <p>AMERICAN EXPESS</p>
                        </div>
                        <div className="card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/ru-pay.svg" alt="" />
                            <p>RUPAY</p>
                        </div>
                        <div className="card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/net-banking.svg" alt="" />
                            <p>NETBANKING</p>
                        </div>
                        <div className="card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/upi.svg" alt="" />
                            <p>UNIFIED PAYMENT INTERFACE</p>
                        </div>
                    </div>
                    <div className="bottom-card" style={{display:'grid',gridTemplateColumns: "repeat(auto-fit,minmax(130px,max-content))",gap:"10px"}}>
                        <div className="bottom-card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/IcoBank-GiftCard.svg" alt="" />
                            <p>GIFT CARD</p>
                        </div>
                        <div className="bottom-card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/co-djpen.svg" alt="" />
                            <p>CASH ON DILIVERY</p>
                        </div>
                        <div className="bottom-card-item">
                            <img src="https://static.zara.net/static/images/payment/payment/in.svg" alt="" />
                            <p>IN CARD</p>
                        </div>
                    </div>
                    <div className="bottom-btn">
                        <p>
                            <div>
                                <b>TOTAL VND{cartData.reduce((acc, el) => {
                                    return acc + el.price*el.quantity;
                                }, 0)}.00 </b>
                            </div>
                            <div>INCLUDING GST</div>
                            <div>* EXCL SHIPPING COST</div>
                        </p>
                        <button className="checkout-btn" onClick={()=>navigate('/fillcarddetail')}>CONTINUE</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PaymentMethod