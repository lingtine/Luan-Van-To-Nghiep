import React, { useState } from "react";
import { useGetWarehousesQuery } from "redux/api/warehouse/warehouse";
import { ISelected } from "components/select-box/select-box";
import SelectBox from "components/select-box/select-box";

interface SelectBoxDataWarehouseProps {
  getSelected: Function;
}

const SelectBoxDataWarehouse: React.FC<SelectBoxDataWarehouseProps> = ({
  getSelected,
}) => {
  const { data, isSuccess } = useGetWarehousesQuery(null);

  const [selected, setSelected] = useState<ISelected>();
  const handleSelect = (option: ISelected) => {
    setSelected(option);
    getSelected(option.id, "from");
  };
  if (isSuccess) {
    const updateData = data.map((item) => ({ ...item, label: item.name }));
    return (
      <SelectBox
        onChange={handleSelect}
        options={updateData}
        selected={selected}
        label="Warehouse"
      />
    );
  }

  return <div></div>;
};

export default SelectBoxDataWarehouse;
