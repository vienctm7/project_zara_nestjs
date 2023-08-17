import { useNavigate, useParams } from "react-router-dom";
import "./Cart.css";
import Footer from "../layout/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import { notification } from "antd";

interface CartItem {
  user_id: string;
  product_name: string;
  product_image: string;
  color: string;
  quantity: number;
  price: number;
  cart_id: number;
}

const Cart: React.FC = () => {
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

  // const {user_id} =useParams()
  // const { id } = useParams();
  const navigate = useNavigate();
  const deletehandle = async (id: number, user_id:string) => {
    console.log(id);
    console.log(user_id);
    
    await axios
      .delete(`http://localhost:8000/cart/${user_id}/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          navigate("/cart");
        }
        loadData();
        notification.success({
          message:"Sản phẩm đã được xóa khỏi giỏi hàng"
        })
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    // Xử lý cập nhật số lượng sản phẩm trong giỏ hàng
    cartData.forEach((item) => {
      axios
        .put(`http://localhost:8000/cart/${item.cart_id}`, {
          quantity: item.quantity,
        })
        .then((res) => {
          console.log(res.data);
          // Cập nhật lại dữ liệu sau khi thành công
          loadData();
        })
        .catch((err) => console.log(err));
    });
  };

  const addHandler = (index: number) => {
    const newCartData = [...cartData];
    if (newCartData[index].quantity < 10) {
      newCartData[index].quantity += 1;
      setCartData(newCartData);
    }
    handleUpdate();
  };

  const reduceHandler = (index: number) => {
    const newCartData = [...cartData];
    if (newCartData[index].quantity <= 10 && newCartData[index].quantity > 1) {
      newCartData[index].quantity -= 1;
      setCartData(newCartData);
    }
    handleUpdate();
  };

  const handleCheckout = () => {
    if (cartData && cartData.length > 0) {
      navigate("/checkout");
    } else {
      alert("Please Add Some Items To Your Cart In Order To Proceed");
    }
  };
  function formatCurrencyVND(amount:any) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  let sum = 0;
  cartData &&
    cartData.forEach((element) => {
      sum += element.price * element.quantity;
    });

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="heading">
          <span>CART({cartData ? cartData.length : "0"})</span>
          <span>WISHLIST</span>
        </div>
        <div className="shoping-cart-msg">
          Items in the basket are not reserved until completing the purchase.
        </div>

        <div className="cart-item-flex">
          {cartData && cartData.length === 0 ? (
            <div style={{ textTransform: "uppercase" }}>cart data is empty</div>
          ) : (
            cartData?.map((item, index) => (
              <div className="cart-item" key={item.cart_id}>
                <div
                  className="cart-item-header"
                  style={{ fontSize: "13px", paddingBottom: "10px" }}
                >
                  {" "}
                  <b>{item.product_name} </b>{" "}
                </div>
                <div className="cart-item-container">
                  <div>
                    <img src={item.product_image} alt="" />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-description">
                      <div>
                        REF. | {item.color ? item.color.split("|")[1] : "453/2"}
                      </div>
                      <div style={{ textTransform: "uppercase" }}>
                        {item.color ? item.color.split("|")[0] : "orange"}
                      </div>
                      <div>M (UK M)</div>
                      <div>
                        {" "}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            reduceHandler(index);
                          }}
                        >
                          -
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            addHandler(index);
                          }}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="item-quantity" style={{ fontSize: "12px" }}>
                      <div>{item.price*item.quantity}</div>
                    </div>
                    <div>
                      {" "}
                      <button onClick={() => deletehandle(item.cart_id, item.user_id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bottom-btn">
          <div>
            <div>
              <b>TOTAL: {formatCurrencyVND(sum)} </b>
            </div>
            <div>INCLUDING </div>
            <div> SHIPPING COST</div>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            CONTINUE
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
