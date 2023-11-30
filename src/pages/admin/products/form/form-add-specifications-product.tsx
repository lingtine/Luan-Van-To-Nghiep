import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { useGetSpecificationsQuery } from "redux/api/catalog/specification";
import SelectBox from "components/select-box/select-box";
import { ISelected } from "components/select-box/select-box";
import { useState } from "react";
import { useAddSpecificationForProductMutation } from "redux/api/catalog/product";
import InputSpecification from "./input-specification";

interface FormAddSpecificationsProductProps {
  productId: string;
  onClose: Function;
}

const FormAddSpecificationsProduct: React.FC<
  FormAddSpecificationsProductProps
> = ({ productId, onClose }) => {
  const [specificationData, setSpecificationData] = useState<
    {
      specificationId: string;
      specificationName: string;
      specificationValue: string;
    }[]
  >([
    {
      specificationId: "",
      specificationName: "",
      specificationValue: "",
    },
  ]);
  const { data, isSuccess } = useGetSpecificationsQuery(null);
  const [addSpecification] = useAddSpecificationForProductMutation();
  const [selected, setSelected] = useState<ISelected>();
  const [value, setValue] = useState<string>("");
  const renderSpecificationData = specificationData.map((item, index) => {
    const indexData = index;

    return (
      <InputSpecification
        specificationData={item}
        onRemove={() => {
          const filterArray = specificationData.filter(
            (_, index) => index !== indexData
          );
          setSpecificationData(filterArray);
        }}
      />
    );
  });

  const handleAddInput = () => {
    setSpecificationData(() => [
      ...specificationData,
      {
        specificationId: "",
        specificationName: "",
        specificationValue: "",
      },
    ]);
  };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selected) {
      addSpecification({
        productId: productId,
        data: [
          {
            specificationId: selected.id,
            specificationName: selected.label,
            specificationValue: value,
          },
        ],
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
      {/* <div className="border p-4 rounded-md border-blue-500 flex flex-col gap-4 overflow-y-scroll h-[236px]">
        {renderSpecificationData}
      </div> */}

      <div className="flex gap-4">
        {content}
        <div>
          <Input
            crossOrigin={""}
            name="name"
            label="Nhập giá trị"
            className="w-100"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <Button type="submit">Thêm Thông số</Button>
      </div>
    </form>
  );
};

export default FormAddSpecificationsProduct;
