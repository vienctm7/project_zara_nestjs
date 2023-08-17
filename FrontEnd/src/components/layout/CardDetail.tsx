import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cardImage from '../../Resources/Images/card.png'
import "./CardDetail.css"
import Navbar from './Navbar'

const CardDetail = () => {
    const navigate = useNavigate()
    return (
        <div className='app'>
            <Navbar/>
                    <div className='containerCardDetail'>
            <div className="checkout-billing-box">
                <div className="checkout-data-header-Billing">
                    <div>Payment Information</div>
                </div>
                <div className="checkout-payment-proceed-box">
                    <div><img src={cardImage} alt="ddd"/></div>
                    <div>
                        <label >Card Number</label>
                        <input type="text" className="cardNumber" placeholder="123456789"/>
                    </div>
                    <div>
                        <div>
                            <label >Expiration Date</label>
                            <input type="text" className="expirationDate" placeholder="12/22"/>
                        </div>
                        <div>
                            <label>CVV</label>
                            <input type="text" className="cvv" placeholder="123"/>
                        </div>
                    </div>
                </div>
                <div className="checkout-place-order">
                    <div><Link to={`/home`}>Cancel</Link></div>
                    <div><button onClick={()=>navigate('/otp')} className="placeOrder">PLACE ORDER</button></div>
                </div>
            </div>
        </div>
        </div>
    )
}


export default CardDetail