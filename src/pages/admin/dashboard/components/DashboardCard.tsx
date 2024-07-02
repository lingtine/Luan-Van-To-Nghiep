import { ReactNode } from "react";
import { formatVND } from "utils/formatVND";

interface IDashboardCardProps {
  title: string;
  total: number;
  icon: ReactNode;
}

const DashboardCard = ({ title, total, icon }: IDashboardCardProps) => {
  const data = title.toLocaleLowerCase().includes("doanh thu")
    ? formatVND(total)
    : total;
  return (
    <div className="flex-[0_0_20%] border-primary-1 border px-8 py-4 rounded-xl items-center gap-4 flex justify-center">
      <div className="text-4xl">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold">{data}</h4>
        <p className="text-sm font-medium">{title}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
