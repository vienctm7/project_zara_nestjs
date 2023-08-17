import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import { Menu } from "antd";

interface MenuItem {
  label: string;
  icon: JSX.Element;
  key: string;
}

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string>("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleMenuClick = (item: MenuItem) => {
    navigate(item.key);
  };

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: <AppstoreOutlined rev=""/>,
      key: "/dashboard",
    },
    {
      label: "Inventory",
      key: "/inventory",
      icon: <ShopOutlined rev=""/>,
    },
    {
      label: "Orders",
      key: "/orders",
      icon: <ShoppingCartOutlined rev=""/>,
    },
    {
      label: "Customers",
      key: "/customers",
      icon: <UserOutlined rev=""/>,
    },
  ];

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={({ key }) => {
          const selectedItem = menuItems.find(item => item.key === key);
          if (selectedItem) {
            handleMenuClick(selectedItem);
          }
        }}
        selectedKeys={[selectedKeys]}
      >
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default SideMenu;