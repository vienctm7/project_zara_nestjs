import { Avatar, Rate, Space, Table, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import AppFooter from "../../Components/AppFooter";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../../AppAdmin.css"
import { Link } from "react-router-dom";

interface Products {
  product_id: number;
  product_name:string;
  product_stocks: number;
  product_image: string;
  price: number;
  description: string;
  brandId: number;
  categoryId: number;
  sold:number;
  care:string
}

        
function Inventory() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Products[]>([]);

  const loadUser = async () => {

    const result = await axios.get("http://localhost:8000/products");
    setDataSource(result.data.products);
  };
  useEffect(() => {
    setLoading(true);
    loadUser();
    setLoading(false);
  }, []);
  const handleDelete = async (id: number)=>{
    await axios.delete(`http://localhost:8000/products/${id}`);
    loadUser();
    notification.success({
      message:"Xóa thành công!"
    })
  }

  const handleUpdate = (productId: number)=>{
    console.log(11);
  }
  return (
    <div className="app">
    <AppHeader/>
    <div className="SideMenuAndPageContent">
      <SideMenu/>
      <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "product_image",
            render: (link: string) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "productName",
            dataIndex: "product_name",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value: number) => <span>${value}</span>,
          },
          // {
          //   title: "Rating",
          //   dataIndex: "rating",
          //   render: (rating: number) => {
          //     return <Rate value={rating} allowHalf disabled />;
          //   },
          // },
          {
            title: "Stock",
            dataIndex: "product_stocks",
          },
          {
            title: "Brand",
            dataIndex: "brand_name",
          },
          {
            title: "Category",
            dataIndex: "category_name",
          },
          {
            title: 'Action',
            key: 'action',
            render: (record: Products) => (
              <>
                <Button
                  onClick={() => handleDelete(record.product_id)}
                  style={{ marginRight: 8 }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleUpdate(record.product_id)}
                >
                  Update
                </Button>
              </>
            ),
          },
          {
            title: <Link to = {"../AddProduct"} style={{color:"#FF4D4F"}}>AddProduct</Link>,
          },
        ]}
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

export default Inventory;