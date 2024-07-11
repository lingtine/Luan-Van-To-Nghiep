import React, { useEffect, useState } from "react";
import { useGetSuppliersQuery } from "redux/api/warehouse/supplier";
import { ISelected } from "components/select-box/select-box";
import SelectBox from "components/select-box/select-box";

interface SelectBoxDataSupplierProps {
  getSelected: Function;
  id?: string;
  disabled?: boolean;
}

const SelectBoxDataSupplier: React.FC<SelectBoxDataSupplierProps> = ({
  getSelected,
  id,
}) => {
  const { data, isSuccess } = useGetSuppliersQuery();

  const [selected, setSelected] = useState<ISelected>();
  const handleSelect = (option: ISelected) => {
    setSelected(option);
    getSelected(option.id, "to");
  };

  useEffect(() => {
    if (id && data) {
      const exist = data.data.find((x) => x.id === id);
      console.log("🚀 ~ useEffect ~ SelectBoxDataSupplier:", exist);
      if (exist) {
        setSelected({ ...exist, label: exist.name });
      }
    }
  }, []);

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
