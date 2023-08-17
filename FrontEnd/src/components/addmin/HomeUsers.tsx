import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

interface FormValue {
  userId: string;
  email: string;
  passwords: string;
  phone: string;
  name: string;
  repeatpassword: string;
  role: string;
}
function HomeUsers() {
  const [users, setUsers] = useState<FormValue[]>([]);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/api/v1/register");
    setUsers(result.data.data);
  };
  useEffect(() => {
    loadUser();
  }, []);

  const deleteUser = async (id: string) => {
    await axios.delete(`http://localhost:8000/api/v1/newcourse/${id}`);
    loadUser();
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr className="bg-dark text-white">
              <th>Id</th>
              <th> Email </th>
              <th> Password </th>
              <th> Name </th>
              <th> Role </th>
              <th colSpan={2}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userId}>
                <th scope="row">{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.repeatpassword}</td>
                <td>{user.name}</td>
                <td>{user.role=="0"?"User":"Admin"}</td>
                <td>
                  <Link to={`/editProduct/${user.userId}`}>
                    <Button variant="success">Active</Button>{" "}
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() => deleteUser(user.userId)}
                    variant="warning"
                  >
                    Unlock
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

export default HomeUsers;
