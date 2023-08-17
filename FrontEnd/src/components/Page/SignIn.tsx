import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { notification } from "antd";
import { resetPerson, postPerson } from "../../Redux/features/personSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";

interface FormValue {
  email: string,
  phoneNumber: string,
  password: string,
  username: string,
  gender: number,
  address:string,
  date_of_birth: string,
}
const initFormValue: FormValue = {
  email: "",
  phoneNumber: "",
  password: "",
  username: "",
  gender: 1,
  address:"",
  date_of_birth: "",
};

const isEmptyValue = (value: string) => {
  return !value || value.trim().length < 1;
};

const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const {persons, error} = useAppSelector(state=>state.person)
  const [formError, setFormError] = useState<{ [key: string]: string }>({});
  const [data, setData] = useState<FormValue>(initFormValue);
  const [tinhThanhList, setTinhThanhList] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const validateForm = () => {
    const error: { [key: string]: string } = {};
    if (isEmptyValue(data.username)) {
      error["usename"] = "name is required";
    }
    if (isEmptyValue(data.phoneNumber)) {
      error["phoneNumber"] = "phoneNumber is required";
    }
    if (isEmptyValue(data.email)) {
      error["email"] = "email is required";
    } else {
      if (!isEmailValid(data.email)) {
        error["email"] = "email is invalid";
      }
    }
    if (isEmptyValue(data.password)) {
      error["password"] = "password is required";
    }
    if (isEmptyValue(data.gender.toString())) {
      error["gender"] = "gender is required";
    }
    if (isEmptyValue(data.address)) {
      error["address"] = "address is required";
    }
    if (isEmptyValue(data.date_of_birth)) {
      error["date_of_birth"] = "date_of_birth is required";
    }
    setFormError(error);

    return Object.keys(error).length === 0;
  };

  useEffect(() => {
    // Gửi yêu cầu GET để lấy thông tin các tỉnh thành
    axios
      .get("https://provinces.open-api.vn/api/")
      .then((response) => {
        // Lưu danh sách các tỉnh thành vào state
        setTinhThanhList(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin tỉnh thành:", error);
      });
  }, []);

  const onclickhandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(data);
      dispatch(postPerson(data));
    } else {
      console.log("form invalid");
    }
  };

  console.log(data);
  useEffect(()=>{
    if(persons.length>0){
      notification.success({
        message:"Đăng kí thành công"
      })
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    
    }
  },[persons])
  console.log(persons);
  
  useEffect(()=>{
    if(error){
notification.error({
  message:"Email đã tồn tại vui lòng nhập lại"
})
    }
  },[error])
  return (
    <div className="app">
    <Navbar/>
      <div className="navbar_space"></div>
      <div className="signin_main_box">
        <h3>PERSONAL DETAILS</h3>
        <div className="personal_company_toggle">
          <div>
            <input type="radio" name="a" />
            <label htmlFor="">PERSONAL </label>
          </div>
          <div>
            <input
              type="radio"
              name="a"
              onClick={() => {
                navigate("/company");
              }}
            />
            <label htmlFor="">COMPANY</label>
          </div>
        </div>
        <div className="signin_second_box">
          <div>
            <form action="">
              <label htmlFor="">E-MAIL</label>
              <br />
              <input
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Enter Email"
                required
              />
              <br />
              <br />
              <hr />
              {formError.email && (
                <div className="error">{formError.email}</div>
              )}
              <label htmlFor="">PASSWORD</label>
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) =>
                  setData({ ...data, password: e.target.value })
                }
                required
              />
              <br />
              <br />
              <hr />
              {formError.passwords && (
                <div className="error">{formError.password}</div>
              )}
              <label htmlFor="">NAME</label>
              <br />
              <input
                type="text"
                placeholder="NAME"
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
              <br />
              <br />
              <hr />
              {formError.usename && <div className="error">{formError.usename}</div>}
              <label htmlFor="">Date_of_birth</label>
              <br />
              <input
                type="text"
                placeholder="Date_of_birth"
                onChange={(e) => setData({ ...data, date_of_birth: e.target.value })}
              />
              <br />
              <br />
              <hr />
              {formError.date_of_birth && <div className="error">{formError.date_of_birth}</div>}
              <label htmlFor="">ADDRESS</label>
              <br />
              <input
                type="text"
                placeholder="ADDRESS"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
              <br />
              <br />
              <hr />
              {formError.address && <div className="error">{formError.address}</div>}
              <label htmlFor="">STATE</label>
              <br />
              <select>
                {tinhThanhList.map((tinhThanh) => (
                  <option key={tinhThanh.id} value={tinhThanh.id}>
                    {tinhThanh.name}
                  </option>
                ))}
              </select>{" "}
              <br />
              <br />
              <hr />
            </form>
          </div>
          <div>
            <label htmlFor=""></label>
            <br />
            <label htmlFor="">GENDER</label>
            <br />
            <input
              type="number"
              placeholder="GENDER"
              onChange={(e) =>
                setData({ ...data, gender: parseInt(e.target.value) })
              }
            />
            <br />
            <br />
            <hr />
            {formError.gender && (
              <div className="error">{formError.gender}</div>
            )}
            <label htmlFor="">PINCODE</label>
            <br />
            <input type="email" placeholder="PINCODE" />
            <br />
            <br />
            <hr />

            <label htmlFor="">MORE INFO</label>
            <br />
            <input type="email" placeholder="OPTIONAL" />
            <br />
            <br />
            <hr />
            <label htmlFor="">CITY</label>
            <br />
            <input type="email" placeholder="CITY" />
            <br />
            <br />
            <hr />
            <label htmlFor="">REGION</label>
            <br />
            <input type="email" placeholder="VIET NAM" />
            <br />
            <br />
            <hr />
          </div>
          <div></div>
        </div>
        <div className="submitSection">
          <div className="prefix_telephone">
            <div>
              PREFIX <br />
              +84
            </div>
            <div>
              <label htmlFor="">TELEPHONE</label>
              <br />
              <input
                type="text"
                placeholder="TELEPHONE"
                onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
              />
              <hr />
              {formError.phoneNumber && (
                <div className="error">{formError.phoneNumber}</div>
              )}
            </div>
          </div>
          <div className="checkbox_input">
            <input type="checkbox" />
            <label htmlFor="">I WISH TO RECEIVE ZARA NEWS ON MY E-MAIL</label>
            <br />
            <input type="checkbox" />
            <label htmlFor="">I ACCEPT THE PRIVACY STATEMENT</label>
          </div>
          <button type="submit" onClick={onclickhandler}>
            CREATE ACCOUNT
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignIn;