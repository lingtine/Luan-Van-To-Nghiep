import React from "react";
import { useGetSpecificationsQuery } from "redux/api/catalog/specification";
import { CiTrash } from "react-icons/ci";
import SelectBox from "components/select-box/select-box";
import { IconButton, Input } from "@material-tailwind/react";
import { ISelected } from "components/select-box/select-box";
import { useState } from "react";
interface InputSpecificationProps {
  specificationData: {
    specificationId: string;
    specificationName: string;
    specificationValue: string;
  };
  onRemove: Function;
}

const InputSpecification: React.FC<InputSpecificationProps> = ({
  specificationData,

  onRemove,
}) => {
  const [selected, setSelected] = useState<ISelected>();

  const { data, isSuccess } = useGetSpecificationsQuery(null);
  let content;
  if (isSuccess) {
    const updateData = data.data.map((item) => ({
      ...item,
      label: item.name,
    }));
    content = (
      <SelectBox
        label="Chọn Thông Số"
        onChange={(option: ISelected) => {
          setSelected(option);
        }}
        options={updateData}
        selected={selected}
      />
    );
  }
  return (
    <div className="flex gap-4">
      {content}
      <div>
        <Input
          crossOrigin={""}
          name="name"
          label="Nhập giá trị"
          className="w-100"
          value={specificationData.specificationName}
        />
      </div>
      <IconButton
        onClick={() => {
          onRemove();
          // setSpecificationData(filteredItems);
        }}
      >
        <CiTrash />
      </IconButton>
    </div>
  );
};

export default InputSpecification;
