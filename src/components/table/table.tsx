import React from "react";
import { Fragment } from "react";
interface TableProps {
  data: [];
  config: {
    label: string;
    render: Function;
  }[];
}

const Table: React.FC<TableProps> = ({ data, config }) => {
  const renderLabel = config.map((colum) => {
    return (
      <th
        key={colum.label}
        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
      >
        {colum.label}
      </th>
    );
  });

  const renderedRow = data.map((dataColum, index) => {
    const renderedColumns = config.map((colum) => {
      return (
        <td key={colum.label} className="p-4">
          <div color="blue-gray" className="font-normal">
            {colum.render(dataColum)}
          </div>
        </td>
      );
    });
    return (
      <tr key={index} className="even:bg-blue-gray-50/50">
        {renderedColumns}
      </tr>
    );
  });
  return (
    <table className="table-auto border-spacing-2 w-full">
      <thead className="">
        <tr>{renderLabel}</tr>
      </thead>
      <tbody>{renderedRow}</tbody>
    </table>
  );
};

export default Table;
