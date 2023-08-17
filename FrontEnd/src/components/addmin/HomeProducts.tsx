import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { notification } from "antd";

interface newcourse {
  newcourseId: string;
  coursesId: string;
  title: string;
  lesson: string;
  image: string;
  hour: string;
  status: string;
  userId: string;
}
function HomeProducts() {
  const [newcourse, setNewcourse] = useState<newcourse[]>([]);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/api/v1/newcourse");
    setNewcourse(result.data.data);
  };
  useEffect(() => {
    loadUser();
  }, []);

  const deleteUser = async (id: string) => {
    await axios.delete(`http://localhost:8000/api/v1/newcourse/${id}`);
    loadUser();
    notification.success({
      message:"Xóa thành công!"
    })
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">
            <h2 style={{color:"#0dcaf0"}}>HOME </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/adminUsers"
                >
                  <h4>Admin User</h4>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/adminCourse"
                >
                  <h4>Admin Course</h4>
                </Link>
              </li>
            </Nav>
            <div className="d-flex">
              <Link to="/addProduct">
                <Button variant="outline-info">Add Course</Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr className="bg-dark text-white">
              <th>Id</th>
              <th> Image </th>
              <th> Title </th>
              <th> Status </th>
              <th> Lesson </th>
              <th> Hour </th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {newcourse.map((product, index) => (
              <tr key={product.newcourseId}>
                <th scope="row">{index + 1}</th>
                <td>
                  {" "}
                  <img
                    style={{
                      maxWidth: 60,
                      maxHeight: 60,
                      minWidth: 60,
                      minHeight: 60,
                    }}
                    src={product.image}
                    alt=""
                  />{" "}
                </td>
                <td>{product.title}</td>
                <td>{product.status}</td>
                <td>{product.lesson}</td>
                <td>{product.hour}</td>
                <td>
                  <Link to={`/editProduct/${product.newcourseId}`}>
                    <Button variant="warning">Edit</Button>{" "}
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() => deleteUser(product.newcourseId)}
                    variant="danger"
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default HomeProducts;
