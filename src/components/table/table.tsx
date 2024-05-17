import React from "react";
import { Card, Typography } from "@material-tailwind/react";

import classNames from "classnames";
interface TableProps {
  data: {}[];
  config: {
    label: string;
    render: Function;
  }[];
}

const Table: React.FC<TableProps> = ({ data, config }) => {
  const renderLabel = config.map((colum, index) => {
    return (
      <th
        key={colum.label}
        className={classNames(
          "border-b border-blue-gray-100 bg-blue-gray-50 p-4  ",
          {
            "text-right": index === config.length - 1,
          }
        )}
      >
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold leading-none opacity-70 uppercase"
        >
          {colum.label}
        </Typography>
      </th>
    );
  });

  const renderedRow = data.map((dataColum, index) => {
    const renderedColumns = config.map((colum) => {
      const isLast = index === data.length - 1;
      const classes = isLast ? "p-4 " : "p-4 border-b border-blue-gray-50 ";
      return (
        <td key={colum.label} className={classes}>
          {colum.render(dataColum)}
        </td>
      );
    });
    return (
      <tr key={index} className="even:bg-blue-gray-50/50  ">
        {renderedColumns}
      </tr>
    );
  });
  return (
    <Card className=" h-full w-full overflow-auto ">
      <table className="w-full min-w-[800px] table-auto text-left overflow-auto">
        <thead className="">
          <tr className="whitespace-nowrap">{renderLabel}</tr>
        </thead>
        <tbody className="w-full">{renderedRow}</tbody>
      </table>
    </Card>
  );
};

export default Table;
