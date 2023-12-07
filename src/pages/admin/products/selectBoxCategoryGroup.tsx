import React from "react";
import { ISelected } from "components/select-box/select-box";

import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import SelectBox from "components/select-box/select-box";
interface SelectBoxCategoryGroupProps {
  setSelect: Function;
  selected?: ISelected;
}

const SelectBoxCategoryGroup: React.FC<SelectBoxCategoryGroupProps> = ({
  selected,
  setSelect,
}) => {
  const { data, isSuccess } = useGetAllCategoryGroupsQuery(null);

  if (isSuccess) {
    const updateData = data.map((item) => {
      return { ...item, label: item.name };
    });
    return (
      <SelectBox
        label="Danh mục sản phẩm"
        options={updateData}
        onChange={setSelect}
        selected={selected}
      />
    );
  }

  return <></>;
};

export default SelectBoxCategoryGroup;
