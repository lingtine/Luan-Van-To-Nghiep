import React from "react";
import TotalCustomerCart from "./components/total-customer-cart";
import TotalOrderCreateCard from "./components/total-order-create-card";
import TotalRevenueCard from "./components/total-revenue-card";
import ProductRevenuePieChart from "./components/product-revenue-pie-chart";
import ChartContent from "./components/chart-content";
import TableNewOrder from "./table-new-order";
interface DashboardAdminProps {}

const DashboardAdmin: React.FC<DashboardAdminProps> = () => {
  return (
    <div className="px-4">
      <div className="flex justify-around gap-4 mt-5">
        <TotalCustomerCart />
        <TotalOrderCreateCard />
        <TotalRevenueCard />
      </div>
      <div className="my-8 flex flex-col gap-4">
        <ProductRevenuePieChart />
        <ChartContent />
        <TableNewOrder />
      </div>
    </div>
  );
};

export default DashboardAdmin;
