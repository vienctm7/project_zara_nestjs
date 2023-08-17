import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import { Link } from "react-router-dom";

function AppHeader() {
  const [comments, setComments] = useState<any[]>([]); // Add type any[] for comments and orders
  const [orders, setOrders] = useState<any[]>([]); // Add type any[] for comments and orders
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false); // Add type boolean for states
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false); // Add type boolean for states

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className="AppHeader">
      <Link to={"/home"}>
      <Image
        style={{borderRadius:"5px", marginBottom:"7px"}}
        width={50}
        src="https://i.pinimg.com/originals/06/2c/06/062c0648194f91f48cd479447d4c0303.jpg"
      ></Image>
      </Link>
     
      <Typography.Title>Admin Manager</Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            rev="" // Add the 'rev' prop here
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            rev="" // Add the 'rev' prop here
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Comments"
        visible={commentsOpen} // Change open to visible
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        visible={notificationsOpen} // Change open to visible
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
    </div>
  );
}

export default AppHeader;