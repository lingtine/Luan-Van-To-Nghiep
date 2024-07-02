import React, { useEffect } from "react";
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
  onChange: Function;
  onRemove: Function;
  specifications: ISelected[];
}

const InputSpecification: React.FC<InputSpecificationProps> = ({
  specificationData,
  onChange,
  onRemove,
  specifications,
}) => {
  const [selected, setSelected] = useState<ISelected>();

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
      <SelectBox
        label="Chọn Thông Số"
        onChange={(option: ISelected) => {
          onChange("option", option);
          setSelected(option);
        }}
        options={specifications}
        selected={selected}
      />
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
      <IconButton
        onClick={() => {
          onRemove();
        }}
      >
        <CiTrash />
      </IconButton>
    </div>
  );
};

export default InputSpecification;
