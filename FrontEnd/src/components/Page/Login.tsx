import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Login.css"
import Footer from "../layout/Footer";
import  Navbar  from "../layout/Navbar";
import { message, notification } from "antd";
import { resetPerson, savePerson } from "../../Redux/features/personSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";

const LogIn: React.FC = () => {

  const email = useRef<string>("");
  const dispatch = useAppDispatch();

  const password = useRef<string>("");
  const {users, error, isFetching} = useAppSelector((state)=>state.person)
  const navigate = useNavigate();

  // const [data, setData] = useState<IData>({
  //   email: "",
  //   password: "",
  // });
  // const newData: IData = {
  //   email: data.email,
  //   password: data.password,
  // };

  console.log(users);
  
useEffect(() => {
  console.log("test");

  if (users.length > 0) {

    if (users[0].roles === 0 && users[0].status === 1) {
      setTimeout(() => {
        navigate('/home');
      }, 2000);
      notification.success({
        message:"Đăng nhập thành công"
      })
    } else if (users[0].roles === 0 && users[0].status === 0) {
      notification.error({
        message: "Tài khoản đã bị khóa! Liên hệ admin để được mở khóa"
      });
    } else if (users[0].roles === 1) {
      // localStorage.setItem("tokenAdmin", JSON.stringify(users.roles));
      navigate("/customers");
    }
  }
}, [users]);

  useEffect(()=>{
    if(error){
      const timeout = setTimeout(()=>{
        notification.error({
          message:"Tài khoản hoặc mật khẩu không đúng! Vui lòng nhập lại"
        })
      },100)
      return ()=>clearTimeout(timeout)
    }
  },[error])

  useEffect(()=>{
    if(isFetching){
      const timeout = setTimeout(()=>{
        dispatch(resetPerson())
      },2000)
      return ()=>clearTimeout(timeout)
    }
  },[isFetching])

  return (
    <div className="app">
    <Navbar/>
      <div className="navbar_space"></div>
      <div className="Login_main_box">
        <div className="Login_second_box">
          <div className="Login_second_box1">
            <h2>LOG IN</h2>
            <form action="">
              <label htmlFor="">E-MAIL</label>
              <br />
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => (email.current = e.target.value)}
              />
              <br />
              <br />
              <label htmlFor="">PASSWORD</label>
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => (password.current = e.target.value)}
              />
              <br />
              <br />
              <button onClick={(e) =>{e.preventDefault(), dispatch(savePerson({ email: email.current, password: password.current }))}}>LOG IN</button>
            </form>
          </div>
          <div className="Login_second_box2">
            <h2>REGISTER</h2>
            <p>
              IF YOU STILL DON'T HAVE A{" "}
              <span>
                <b>ZARA.COM</b>
              </span>{" "}
              ACCOUNT, USE THIS OPTION TO ACCESS THE REGISTRATION FORM.
            </p>
            <p>
              BY GIVING US YOUR DETAILS, PURCHASING IN <b>ZARA.COM</b> WILL BE
              FASTER AND AN ENJOYABLE EXPERIENCE.
            </p>
            <button
              onClick={() => {
                navigate("/signin");
              }}
            >
              CREATE ACCOUNT
            </button>
          </div>

          <div className="signbox">
            <p>
              DONT HAVE AN ACCOUNT? <Link to={`/signin`}>REGISTER</Link>
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LogIn;