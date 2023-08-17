import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import "../../AppAdmin.css"
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import AppFooter from "../../Components/AppFooter";
import axios from "axios";
import { Tag } from 'antd';

import { Button } from "react-bootstrap";




interface Customer {
  user_id:string,
  email: string,
  phoneNumber: string,
  password: string,
  username: string,
  gender: number,
  address:string,
  date_of_birth: string,
  roles:number,
  status:number
}

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Customer[]>([]);

  const loadUser = async () => {

    const result = await axios.get("http://localhost:8000/users");
    setDataSource(result.data.allUsers);
  };
  useEffect(() => {
    setLoading(true);
    loadUser();
    setLoading(false);
  }, []);

  const updateStatusInDatabase = async (userId: string, newStatus: number) => {
    try {
      await axios.put(`http://localhost:8000/users/${userId}`, { status: newStatus });
      console.log('Status updated successfully.');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const toggleStatus = async (id: string, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    
    const updatedData = dataSource.map(item => {
      if (item.user_id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
  
    setDataSource(updatedData);
  
    // Update status in the database
    await updateStatusInDatabase(id, newStatus);
  };
  
  const columns = [
    {
      title: "Photo",
      dataIndex: "image",
      render: (link: string) => {
        return <Avatar src={link} />;
      },
    },
    {
      title: " Name",
      dataIndex: "username",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender: number) => (gender === 1 ? <a>Nam</a> : <a>Nữ</a>),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      render: (roles: number) => (roles === 1 ? <a color="red">Admin</a> : <a>User</a>),
    },
    {
      title: "status",
      dataIndex: "status",

      render: (roles: number) => (
        <Tag color={roles === 1 ? 'blue' : 'pink'}>
        {roles === 1 ? 'Đang hoạt động' : 'Đang bị khóa'}
      </Tag>),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Customer) => (
        <Button
          onClick={() => toggleStatus(record.user_id, record.status)}
          
        >
          {record.status === 1 ? <i className="fa-sharp fa-solid fa-lock"></i> : <i className="fa-sharp fa-solid fa-unlock"></i>}
        </Button>
      ),
    },
  ];

  return (
    <div className="app">
        <AppHeader/>
        <div className="SideMenuAndPageContent">
          <SideMenu/>
        <Space size={20} direction="vertical">
      <Typography.Title level={5} style={{marginTop:"20px"}}>Customers</Typography.Title>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
        </div>
        <AppFooter/>
    </div>
    
  );
}

export default Customers;