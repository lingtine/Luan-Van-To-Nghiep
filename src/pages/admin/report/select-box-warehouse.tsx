import React, { useEffect, useState } from "react";
import { useGetWarehousesQuery } from "redux/api/warehouse/warehouse";
import { ISelected } from "components/select-box/select-box";
import SelectBox from "components/select-box/select-box";
import { IWarehouse } from "share/types/warehouse";

interface SelectBoxDataWarehouseProps {
  getSelected: Function;
  label: string;
  id?: string;
}

const SelectBoxDataWarehouse: React.FC<SelectBoxDataWarehouseProps> = ({
  getSelected,
  label,
  id,
}) => {
  const { data, isSuccess } = useGetWarehousesQuery({});

  const [selected, setSelected] = useState<ISelected>();

  useEffect(() => {
    if (id && data) {
      const exist = data.data.find((x) => x.id === id);
      if (exist) {
        setSelected({ ...exist, label: exist.name });
      }
    }
  }, []);
  const handleSelect = (option: ISelected) => {
    setSelected(option);
    getSelected(option.id, "from");
  };
  if (isSuccess) {
    const updateData = data.data.map((item) => ({ ...item, label: item.name }));
    return (
      <SelectBox
        onChange={handleSelect}
        options={updateData}
        selected={selected}
        label={label}
      />
    );
  }

  return <div></div>;
};

export default SelectBoxDataWarehouse;
