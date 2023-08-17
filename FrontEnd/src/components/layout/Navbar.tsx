import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import Signout from "./Signout";
import axios from "axios";

interface CartItem {
  user_id: number;
  product_name: string;
  product_image: string;
  color: string;
  quantity: number;
  price: number;
  cartId: number;
}
const Navbar: React.FC<any> = ({ activeIndexs }) => {
  const [colorB, setColorB] = useState("");
  const [theme, setTheme] = useState("black");
  const [val, setVal] = useState(true);
  const location = useLocation();

  const token = localStorage.getItem("token") || "";

  const [cartData, setCartData] = useState<CartItem[]>([]);
  const user: any = JSON.parse(localStorage.getItem("user") || "{}");
  const Id = user.user_id;
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

  const handleChange = (e: any) => {
    changeVal();
    if (e.target.checked) {
      setColorB("white");
    } else {
      setColorB("");
    }
  };

  const changeVal = () => {
    setVal(!val);
  };

  useEffect(() => {
    if (activeIndexs >= 0) {
      if (activeIndexs % 2 === 0) {
        setTheme("white");
      } else {
        setTheme("black");
      }
    } else if (val === true) {
      setTheme("transparent");
    }

    if (location.pathname !== "/") {
      setTheme("black");
    }
  }, [activeIndexs, val, location]);

  const menuItem = [
    "NEW",
    "BEST SELLERS",
    "BASICS",
    "JACKETS | OVERSHIRTS",
    "DRESSES | JUMPSUITS",
    "BLAZERS",
    "SHIRTS",
    "TROUSERS",
    "TOPS",
    "JEANS",
    "KNITWEAR",
    "SWEATSHIRTS",
    "T-SHIRTS",
    "WAISTCOATS | GILETS",
    "SHORTS | SKORTS",
    "SKIRTS",
    "CO-ORD SETS",
    "SUITS",
    "COATS | PUFFER JACKETS",
    "ACCESSORIES",
    "SHOES",
    "BAGS",
    "PERFUMES",
    "Special Prices",
    "WEAR TO WORK",
    "SPECIAL EDITION",
  ];

  return (
    <>
      <div
        className="ContainerNavbar"
        style={{
          backgroundColor: location.pathname === "/" ? "transparent" : "white",
        }}
      >
        <div className="menuContainer" style={{ backgroundColor: colorB }}>
          <header className="header" style={{ backgroundColor: colorB }}>
            <input
              className="menu-btn"
              type="checkbox"
              id="menu-btn"
              onClick={(e) => handleChange(e)}
            />
            <label className="menu-icon" htmlFor="menu-btn">
              <span className="navicon"></span>
            </label>
            <div className="menuLogo" >
              <Link to={"/home"}>
                {" "}
                <svg
                  viewBox="0 0 132 55"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
          
                    fillRule="evenodd"
                    d="M105.673.035l19.557 53.338 6.77.002v.383h-21.548v-.383h6.344l-6.431-17.54H97.311v.007l.07.204c.521 1.548.78 3.17.764 4.803v6.575c0 3.382 1.494 6.81 4.347 6.81 1.675 0 3.012-.59 4.604-2.046l.227.211C105.594 54.224 103.5 55 100.36 55c-2.37 0-4.398-.57-6.03-1.693l-.309-.222c-2.148-1.624-3.542-4.278-4.142-7.89l-.096-.583-.1-.882-.01-.152-3.599 9.792h5.107v.384H80.496v-.384h5.162l3.951-10.753v-.023a34.924 34.924 0 0 1-.075-1.906v-4.693c0-5.77-4.29-9.08-11.771-9.08H70.41v26.458h6.371v.383h-24.9v-.383h6.345l-6.431-17.54H33.948l-6.371 17.346.266-.044c8.366-1.442 12.213-7.827 12.265-14.55h.388v15.171H0L30.06 2.185H17.972C7.954 2.185 3.42 9.922 3.35 17.635h-.387V1.8h36.488l-.222.385L9.396 53.373h15.695c.39 0 .778-.019 1.169-.05.26-.018.522-.044.788-.077l.095-.01L46.703 0h.387l.013.035 15.369 41.916V2.185h-6.328v-.39h21.778c10.467 0 17.774 5.372 17.774 13.068 0 5.612-5.005 10.27-12.45 11.595l-1.367.174 1.377.14c4.515.517 8.1 1.906 10.641 4.127l.017.016L105.273 0h.386l.014.035zm-8.552 35.32l.038.094h13.061l-8.773-23.928-7.221 19.67.039.037.367.364a11.876 11.876 0 0 1 2.489 3.762zM70.415 26.53V2.185h5.611c7.496 0 11.454 4.414 11.454 12.76 0 8.877-2.272 11.585-9.717 11.585h-7.348zM42.882 11.521L34.09 35.45h17.565L42.882 11.52z"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="menuTop">
              <Link to={`/womens`} state={{ query: "women1" }}>
                <span>WOMAN</span>
              </Link>
              <Link to={`/mens`} state={{ query: "men1" }}>
                <span>MENS</span>
              </Link>
              <Link to={`/kids`} state={{ query: "products" }}>
                <span>KIDS</span>
              </Link>
              <Link to={`/origins`} state={{ query: "products" }}>
                <span>ZARA ORIGINS</span>
              </Link>
            </div>
            <ul className="menu" style={{ overflow: "auto" }}>
              {menuItem.map((ele, index) => (
                <li key={index}>
                  <Link
                    to={`/products`}
                    style={
                      ele === "Special Prices"
                        ? { color: "rgb(245, 57, 147)" }
                        : {}
                    }
                  >
                    {ele}
                  </Link>
                </li>
              ))}
            </ul>
          </header>
          <div className="logo">
            <svg viewBox="0 0 132 55" xmlns="http://www.w3.org/2000/svg">
              <Link to="/home">
                <path
                  fill={`${theme}`}
                  fillRule="evenodd"
                  d="M105.673.035l19.557 53.338 6.77.002v.383h-21.548v-.383h6.344l-6.431-17.54H97.311v.007l.07.204c.521 1.548.78 3.17.764 4.803v6.575c0 3.382 1.494 6.81 4.347 6.81 1.675 0 3.012-.59 4.604-2.046l.227.211C105.594 54.224 103.5 55 100.36 55c-2.37 0-4.398-.57-6.03-1.693l-.309-.222c-2.148-1.624-3.542-4.278-4.142-7.89l-.096-.583-.1-.882-.01-.152-3.599 9.792h5.107v.384H80.496v-.384h5.162l3.951-10.753v-.023a34.924 34.924 0 0 1-.075-1.906v-4.693c0-5.77-4.29-9.08-11.771-9.08H70.41v26.458h6.371v.383h-24.9v-.383h6.345l-6.431-17.54H33.948l-6.371 17.346.266-.044c8.366-1.442 12.213-7.827 12.265-14.55h.388v15.171H0L30.06 2.185H17.972C7.954 2.185 3.42 9.922 3.35 17.635h-.387V1.8h36.488l-.222.385L9.396 53.373h15.695c.39 0 .778-.019 1.169-.05.26-.018.522-.044.788-.077l.095-.01L46.703 0h.387l.013.035 15.369 41.916V2.185h-6.328v-.39h21.778c10.467 0 17.774 5.372 17.774 13.068 0 5.612-5.005 10.27-12.45 11.595l-1.367.174 1.377.14c4.515.517 8.1 1.906 10.641 4.127l.017.016L105.273 0h.386l.014.035zm-8.552 35.32l.038.094h13.061l-8.773-23.928-7.221 19.67.039.037.367.364a11.876 11.876 0 0 1 2.489 3.762zM70.415 26.53V2.185h5.611c7.496 0 11.454 4.414 11.454 12.76 0 8.877-2.272 11.585-9.717 11.585h-7.348zM42.882 11.521L34.09 35.45h17.565L42.882 11.52z"
                ></path>
              </Link>
            </svg>
          </div>
        </div>
        <div className="navRightSection" style={{ zIndex: !val ? "0" : "10" }}>
          <Link
            to="/search"
            style={{
              visibility:
                location.pathname === "/search" ? "hidden" : "visible",
            }}
          >
            <div>
              <input type="text" placeholder="SEARCH" />
            </div>
          </Link>
          <div>
            <div></div>
            {!token ? (
              <Link to="/login" state={{ path: "/" }}>
                {" "}
                <span>LOGIN</span>
              </Link>
            ) : (
              <Signout />
            )}
            {/* {token ? <Link to='/'> <span>{user.username}</span></Link> : <></>} */}
            <Link to="/help">
              <span className="help">HELP</span>
            </Link>
            <Link to="/cart">
              <svg
                style={{ marginTop: "15px" }}
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                stroke="inherit"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.5 4.9V3.3a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.6h4.8V12h-1V5.9H4.7v14H15v1H3.7v-16h4.8zm1-1.6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.6h-5V3.3z"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.4 23.4v-9h5.4v9l-2.705-2.673L17.4 23.4zm2.694-3.798L22 21.485V15.2h-3.8v6.28l1.894-1.878z"
                ></path>
              </svg>
              <span
                style={{
                  position: "relative",
                  right: cartData && cartData.length > 9 ? "21px" : "-11px",
                  top: "-24px",
                  fontSize: "12px",
                }}
              >
                {token ? cartData.length : "0"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
