import { ICustomerSale } from "share/types/order";

interface ICustomerSaleChartProps {
  data: ICustomerSale[];
}

const CustomerSaleChart = ({ data }: ICustomerSaleChartProps) => {
  const rows = data.map((x) => {
    return {
      id: x.id,
      name: x.name,
      soldCount: x.soldCount,
      returnedCount: x.returnedCount,
      soldQuantity: x.soldQuantity,
      soldAmount: x.soldAmount,
      returnedQuantity: x.returnedQuantity,
      returnedAmount: x.returnedAmount,
      totalDiscount: x.totalDiscount,
      totalProfit: x.totalProfit,
      totalQuantity: x.totalQuantity,
      averageQuantity: x.averageQuantity,
      lastSale: x.lastSale,
    };
  });
  console.log("🚀 ~ rows ~ rows:", rows)


  return <div></div>;
};

export default CustomerSaleChart;
