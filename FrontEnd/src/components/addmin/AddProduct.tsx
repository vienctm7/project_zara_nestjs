import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

interface newcourse {
  coursesId: string;
  title: string;
  lesson: string;
  image: string;
  hour: string;
  status: string;
  userId: string;
}

function AddProduct() {
  const [newcourse, setNewcourse] = useState<newcourse>({
    coursesId: "",
    title: "",
    lesson: "",
    image: "",
    hour: "",
    status: "",
    userId: "",
  });
  const navigate = useNavigate();
  const { coursesId, title, lesson, image, hour, status, userId } =
    newcourse;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewcourse({
      ...newcourse,
      [e.target.name]: e.target.value,
    });
  };
console.log(newcourse);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    await axios.post("http://localhost:8000/api/v1/newcourse", newcourse);
    notification.success({
      message:"thêm mới khóa học thành công"
    })
    setTimeout(() => {
      navigate("/adminCourse");
    }, 2000);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h3>Add Product</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">Image: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your name product"
            value={image}
            name="image"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Title: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your title"
            value={title}
            name="title"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Status: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Phone Number"
            value={status}
            name="status"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Lesson: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Lesson"
            value={lesson}
            name="lesson"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">Hour: </label>
          <br />
          <input
            type="text"
            placeholder="Enter Your hour"
            value={hour}
            className="form-control"
            name="hour"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">coursesId: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your coursesId"
            value={coursesId}
            name="coursesId"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <label htmlFor="">UserId: </label>
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your userId"
            value={userId}
            name="userId"
            onChange={(e) => handleChangeInput(e)}
          />
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
