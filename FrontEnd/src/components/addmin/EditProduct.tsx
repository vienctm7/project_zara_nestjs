import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

interface NewCourse {
  coursesId: string;
  title: string;
  lesson: string;
  image: string;
  hour: string;
  status: string;
  userId: string;
}

function EditProduct() {
  const [newcourse, setNewcourse] = useState<NewCourse>({
    coursesId: "",
    title: "",
    lesson: "",
    image: "",
    hour: "",
    status: "",
    userId: "",
  });

  console.log("newcourse", newcourse);

  const { coursesId, title, lesson, image, hour, status, userId } = newcourse;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewcourse({
      ...newcourse,
      [e.target.name]: e.target.value,
    });
  };

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/v1/newcourse/${id}`, newcourse);
    notification.success({
      message:"update thành công"
    })
    setTimeout(() => {
      navigate("/adminCourse");
    }, 2000);
  };

  const loadUser = async () => {
    const result = await axios.get(
      `http://localhost:8000/api/v1/newcourse/${id}`
    );
    setNewcourse(result.data.data[0]);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h3>Edit Product</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">Image: </label>
            <br />
            <input
              type="text"
              placeholder="Enter Your name product"
              value={image}
              name="image"
              onChange={(e) => handleChangeInput(e)}
              className="form-control"
            />
            <br />
            <label htmlFor="">Title: </label>
            <br />
            <input
              type="text"
              placeholder="Enter Your title"
              value={title}
              className="form-control"
              name="title"
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor="">Status: </label>
            <br />
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              value={status}
              name="status"
              className="form-control"
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor="">Lesson: </label>
            <br />
            <input
              type="text"
              placeholder="Enter Your Lesson"
              value={lesson}
              className="form-control"
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
              name="hour"
              className="form-control"
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor="">coursesId: </label>
            <br />
            <input
              type="text"
              placeholder="Enter Your coursesId"
              value={coursesId}
              name="coursesId"
              className="form-control"
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            <label htmlFor="">UserId: </label>
            <br />
            <input
              type="text"
              placeholder="Enter Your userId"
              value={userId}
              className="form-control"
              name="userId"
              onChange={(e) => handleChangeInput(e)}
            />
            <br />
            <Button variant="primary" type="submit">
              Update Course
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
