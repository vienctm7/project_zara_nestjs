import React from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/home");
  };
  return <span style={{cursor:"pointer"}} onClick={handleSignout}>LOGOUT</span>;
};

export default Signout;
