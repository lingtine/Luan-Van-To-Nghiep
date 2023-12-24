import SideBySideChart from "components/charts/side-by-side-chart";
import React, { useEffect } from "react";
import { useGetProductReportMutation } from "redux/api/catalog/product";

interface ChartContentProps {}

const ChartContent: React.FC<ChartContentProps> = () => {
  const [getReport, result] = useGetProductReportMutation();

  useEffect(() => {
    const newDate = new Date();
    const dateStart = new Date().getDate() - 7;
    newDate.setDate(dateStart);
    const dateEnd = new Date().toISOString();

    getReport({
      end: dateEnd,
      start: newDate.toISOString(),
    });
  }, []);

  if (result.isSuccess) {
    const options = result.data.data.data.map(
      (item: { productName: string }) => {
        return item.productName;
      }
    );

    const viewRates = result.data.data.data.map(
      (item: { viewRate: number }) => {
        return item.viewRate;
      }
    );
    const boughtRate = result.data.data.data.map(
      (item: { boughtRate: number }) => {
        return item.boughtRate;
      }
    );

    return (
      <SideBySideChart
        options={options}
        series={[
          {
            data: viewRates,
            name: "Lượt xem",
          },
          {
            data: boughtRate,
            name: "Lượt mua",
          },
        ]}
        title="Tỉ lệ lượt xem là lượt mua"
      />
    );
  }

  return <></>;
};

export default ChartContent;
