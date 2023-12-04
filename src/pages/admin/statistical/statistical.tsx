import React from "react";
import { InputDate } from "components";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
interface StatisticalProps {}

const Statistical: React.FC<StatisticalProps> = () => {
  const [dateEnd, setDateEnd] = useState<Date>();
  const [dateStart, setDateStart] = useState<Date>();

  return (
    <div>
      <div className="flex gap-2 h-full justify-center">
        <InputDate date={dateEnd} setDate={setDateEnd} />
        <InputDate date={dateStart} setDate={setDateStart} />
        <Button>In ra báo cáo</Button>
      </div>
    </div>
  );
};

export default Statistical;
