import React from "react";

import SelectBox from "components/select-box/select-box";
import { ISelected } from "components/select-box/select-box";
import { useGetWarehousesQuery } from "redux/api/warehouse/warehouse";

interface SelectBoxWarehouseProps {
  onChange: Function;
  selected?: ISelected;
}

const SelectBoxWarehouse: React.FC<SelectBoxWarehouseProps> = ({
  onChange,
  selected,
}) => {
  const { data, isSuccess } = useGetWarehousesQuery(null);
  if (isSuccess) {
    const configData = data.data.map((item) => {
      return { ...item, label: item.name };
    });

    return (
      <SelectBox
        options={configData}
        onChange={(value: ISelected) => {
          onChange(value);
        }}
        selected={selected}
        label="Chọn kho"
      />
    );
  }

  return <div></div>;
};

export default SelectBoxWarehouse;
