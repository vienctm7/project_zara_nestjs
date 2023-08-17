// import {
//   DollarCircleOutlined,
//   ShoppingCartOutlined,
//   ShoppingOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Card, Space, Statistic, Table, Typography } from "antd";
// import { useEffect, useState } from "react";
// import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface Order {
//   title: string;
//   quantity: number;
//   discountedPrice: number;
// }

// interface Cart {
//   userId: string;
//   discountedTotal: number;
// }

// function Dashboard() {
//   const [orders, setOrders] = useState<number>(0);
//   const [inventory, setInventory] = useState<number>(0);
//   const [customers, setCustomers] = useState<number>(0);
//   const [revenue, setRevenue] = useState<number>(0);

//   useEffect(() => {
//     getOrders().then((res) => {
//       setOrders(res.total);
//       setRevenue(res.discountedTotal);
//     });
//     getInventory().then((res) => {
//       setInventory(res.total);
//     });
//     getCustomers().then((res) => {
//       setCustomers(res.total);
//     });
//   }, []);

//   return (
//     <Space size={20} direction="vertical">
//       <Typography.Title level={4}>Dashboard</Typography.Title>
//       <Space direction="horizontal">
//         <DashboardCard
//           icon={
//             <ShoppingCartOutlined
//               style={{
//                 color: "green",
//                 backgroundColor: "rgba(0,255,0,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Orders"}
//           value={orders}
//         />
//         <DashboardCard
//           icon={
//             <ShoppingOutlined
//               style={{
//                 color: "blue",
//                 backgroundColor: "rgba(0,0,255,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Inventory"}
//           value={inventory}
//         />
//         <DashboardCard
//           icon={
//             <UserOutlined
//               style={{
//                 color: "purple",
//                 backgroundColor: "rgba(0,255,255,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Customer"}
//           value={customers}
//         />
//         <DashboardCard
//           icon={
//             <DollarCircleOutlined
//               style={{
//                 color: "red",
//                 backgroundColor: "rgba(255,0,0,0.25)",
//                 borderRadius: 20,
//                 fontSize: 24,
//                 padding: 8,
//               }}
//             />
//           }
//           title={"Revenue"}
//           value={revenue}
//         />
//       </Space>
//       <Space>
//         <RecentOrders />
//         <DashboardChart />
//       </Space>
//     </Space>
//   );
// }

// interface DashboardCardProps {
//   title: string;
//   value: number;
//   icon: JSX.Element;
// }

// function DashboardCard({ title, value, icon }: DashboardCardProps) {
//   return (
//     <Card>
//       <Space direction="horizontal">
//         {icon}
//         <Statistic title={title} value={value} />
//       </Space>
//     </Card>
//   );
// }

// function RecentOrders() {
//   const [dataSource, setDataSource] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     getOrders().then((res) => {
//       setDataSource(res.products.slice(0, 3));
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <>
//       <Typography.Text>Recent Orders</Typography.Text>
//       <Table
//         columns={[
//           {
//             title: "Title",
//             dataIndex: "title",
//           },
//           {
//             title: "Quantity",
//             dataIndex: "quantity",
//           },
//           {
//             title: "Price",
//             dataIndex: "discountedPrice",
//           },
//         ]}
//         loading={loading}
//         dataSource={dataSource}
//         pagination={false}
//       />
//     </>
//   );
// }

// function DashboardChart() {
//   const [revenueData, setRevenueData] = useState<any>({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     getRevenue().then((res) => {
//       const labels = res.carts.map((cart: Cart) => {
//         return `User-${cart.userId}`;
//       });
//       const data = res.carts.map((cart: Cart) => {
//         return cart.discountedTotal;
//       });

//       const dataSource = {
//         labels,
//         datasets: [
//           {
//             label: "Revenue",
//             data,
//             backgroundColor: "rgba(255, 0, 0, 1)",
//           },
//         ],
//       };

//       setRevenueData(dataSource);
//     });
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: true,
//         text: "Order Revenue",
//       },
//     },
//   };

//   return (
//     <Card style={{ width: 500, height: 250 }}>
//       <Bar options={options} data={revenueData} />
//     </Card>
//   );
// }

// export default Dashboard;
import React from 'react'
import AppFooter from '../../Components/AppFooter'
import SideMenu from '../../Components/SideMenu'
import AppHeader from '../../Components/AppHeader'

function Dashboard() {
  return (
    <div className="app">
    <AppHeader/>
    <div className="SideMenuAndPageContent">
      <SideMenu/>
    <div>This is Dashbaord</div>
    </div>
    <AppFooter/>
    </div>
  )
}

export default Dashboard