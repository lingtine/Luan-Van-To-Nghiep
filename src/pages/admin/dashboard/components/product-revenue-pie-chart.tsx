import { useEffect } from "react";
import PieChart from "components/charts/pie-chart";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { useProductRevenueReportingMutation } from "redux/api/catalog/product";

interface ProductRevenuePieChartProps {}

const ProductRevenuePieChart: React.FC<ProductRevenuePieChartProps> = () => {
  const [getOrderReport, { isSuccess, isLoading, data }] =
    useProductRevenueReportingMutation();

  useEffect(() => {
    const dateStart = new Date().toISOString();
    const dateEnd = new Date().toISOString();
    getOrderReport({
      start: dateStart,
      end: dateEnd,
    });
  }, [getOrderReport]);
  let content;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-[100vh]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  } else if (isSuccess) {
    if (data && data.length !== 0) {
      const options = data.map((item) => {
        return item.productName;
      });
      const series = data.map((item) => {
        return item.revenue;
      });
      return (
        <PieChart
          title="Doanh thu sản phẩm hôm này"
          series={series}
          options={options}
          width={800}
          height={800}
        />
      );
    }
  }
  return <></>;
};

export default ProductRevenuePieChart;
