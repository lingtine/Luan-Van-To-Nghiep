import React from "react";
import { Button } from "@material-tailwind/react";
import { ISelected } from "components/select-box/select-box";
import { useState } from "react";
import { useAddSpecificationForProductMutation } from "redux/api/catalog/product";
import InputSpecification from "./input-specification";

interface FormAddSpecificationsProductProps {
  productId: string;
  onClose: Function;
}

interface ISpecification {
  specificationId: string;
  specificationName: string;
  specificationValue: string;
}

const FormAddSpecificationsProduct: React.FC<
  FormAddSpecificationsProductProps
> = ({ productId, onClose }) => {
  const [specificationsData, setSpecificationsData] = useState<
    ISpecification[]
  >([{ specificationId: "", specificationName: "", specificationValue: "" }]);

  const [addSpecification] = useAddSpecificationForProductMutation();

  const renderSpecificationData = specificationsData.map((item, index) => {
    const indexData = index;

    return (
      <InputSpecification
        onChange={(title: string, value: string | ISelected) => {
          if (title === "value" && typeof value === "string") {
            const newSpecificationsData = specificationsData.map(
              (item, index) => {
                if (index === indexData)
                  return { ...item, specificationValue: value };
                return item;
              }
            );
            setSpecificationsData(newSpecificationsData);
          } else if (typeof value === "object") {
            const newSpecificationsData = specificationsData.map(
              (item, index) => {
                if (index === indexData)
                  return {
                    ...item,
                    specificationId: value.id,
                    specificationName: value.label,
                  };
                return item;
              }
            );
            setSpecificationsData(newSpecificationsData);
          }
        }}
        specificationData={item}
        onRemove={() => {
          if (specificationsData.length <= 1) return;
          const filterArray = specificationsData.filter(
            (_, index) => index !== indexData
          );
          setSpecificationsData(filterArray);
        }}
      />
    );
  });

  const handleAddInput = () => {
    setSpecificationsData(() => [
      ...specificationsData,
      {
        specificationId: "",
        specificationName: "",
        specificationValue: "",
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (specificationsData) {
      addSpecification({
        productId: productId,
        data: specificationsData,
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
      <div className="border p-4 rounded-md border-blue-500 flex flex-col gap-4 overflow-y-scroll h-[236px]">
        {renderSpecificationData}
      </div>

      <div className="flex gap-4">
        <Button onClick={handleAddInput}>Thêm Thông số</Button>
        <Button type="submit" color="blue">
          Xác nhận
        </Button>
      </div>
    </form>
  );
};

export default FormAddSpecificationsProduct;
