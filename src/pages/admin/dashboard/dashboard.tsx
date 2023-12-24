import React from "react";
import TotalCustomerCart from "./components/total-customer-cart";
import TotalOrderCreateCard from "./components/total-order-create-card";
import TotalRevenueCard from "./components/total-revenue-card";
import ProductRevenuePieChart from "./components/product-revenue-pie-chart";
interface DashboardAdminProps {}

const DashboardAdmin: React.FC<DashboardAdminProps> = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-around">
        <TotalCustomerCart />
        <TotalOrderCreateCard />
        <TotalRevenueCard />
      </div>
      <div className="my-8 px-8">
        <ProductRevenuePieChart />
      </div>
    </div>
  );
};

export default DashboardAdmin;
