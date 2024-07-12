import React, { useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import SelectBox from "components/select-box/select-box";
import { Input } from "@material-tailwind/react";
import { ISelected } from "components/select-box/select-box";
import { useState } from "react";
import { useGetSpecificationsQuery } from "redux/api/catalog/specification";
import { Button } from "@mui/material";
interface InputSpecificationProps {
  specificationData: {
    specificationId: string;
    specificationName: string;
    specificationValue: string;
  };
  onChange: Function;
  onRemove: Function;
  specifications: ISelected[];
  productSpecificationIds: string[];
}

const InputSpecification: React.FC<InputSpecificationProps> = ({
  specificationData,
  onChange,
  onRemove,
  specifications,
  productSpecificationIds,
}) => {
  const [selected, setSelected] = useState<ISelected>();
  const { data, isSuccess } = useGetSpecificationsQuery({
    PageSize: 9999,
  });

  let content;
  if (isSuccess) {
    const updateData = data.data
      .filter((x) => !productSpecificationIds.includes(x.id))
      .map((item) => ({
        ...item,
        label: item.name,
      }));

    content = (
      <SelectBox
        label="Chọn Thông Số"
        onChange={(option: ISelected) => {
          onChange("option", option);
          setSelected(option);
        }}
        options={updateData}
        selected={selected}
      />
    );
  }
  useEffect(() => {
    if (specificationData) {
      let option = {
        id: specificationData.specificationId,
        label: specificationData.specificationName,
      };
      setSelected(option);
    }
  }, [specificationData]);

  return (
    <div className="flex gap-4">
      {content}

      <div>
        <Input
          crossOrigin={""}
          name="specificationValue"
          label="Nhập giá trị"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            onChange("value", value);
          }}
          className="w-100"
          value={specificationData.specificationValue}
        />
      </div>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          onRemove();
        }}
      >
        <CiTrash />
      </Button>
    </div>
  );
};

export default InputSpecification;
