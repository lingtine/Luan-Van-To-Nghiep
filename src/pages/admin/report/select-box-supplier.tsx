import React, { useState } from "react";
import { useGetSuppliersQuery } from "redux/api/warehouse/supplier";
import { ISelected } from "components/select-box/select-box";
import SelectBox from "components/select-box/select-box";

interface SelectBoxDataSupplierProps {
  getSelected: Function;
}

const SelectBoxDataSupplier: React.FC<SelectBoxDataSupplierProps> = ({
  getSelected,
}) => {
  const { data, isSuccess } = useGetSuppliersQuery();

  const [selected, setSelected] = useState<ISelected>();
  const handleSelect = (option: ISelected) => {
    setSelected(option);
    getSelected(option.id, "to");
  };
  if (isSuccess) {
    const updateData = data.data.map((item) => ({ ...item, label: item.name }));
    return (
      <SelectBox
        onChange={handleSelect}
        options={updateData}
        selected={selected}
        label="Nhà cung cấp"
      />
    );
  }

  return <div></div>;
};

export default SelectBoxDataSupplier;
