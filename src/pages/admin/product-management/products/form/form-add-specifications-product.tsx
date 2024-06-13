import React from "react";
import { Button } from "@material-tailwind/react";
import { ISelected } from "components/select-box/select-box";
import { useState } from "react";
import { useAddSpecificationForProductMutation } from "redux/api/catalog/product";
import InputSpecification from "./input-specification";
import {
  IProductSpecification,
  IProductSpecificationInput,
} from "share/types/product";

interface FormAddSpecificationsProductProps {
  productId: string;
  onClose: Function;
  productSpecifications: IProductSpecification[];
  isAdd?: boolean;
  handleAddSpecifications?: Function;
}

const FormAddSpecificationsProduct: React.FC<
  FormAddSpecificationsProductProps
> = ({
  productId,
  onClose,
  productSpecifications,
  isAdd = false,
  handleAddSpecifications,
}) => {
  const [specificationsData, setSpecificationsData] = useState<
    IProductSpecificationInput[]
  >(() =>
    productSpecifications.length
      ? productSpecifications
      : [{ specificationId: "", specificationName: "", specificationValue: "" }]
  );
  const [existingIds, setExistingIds] = useState<string[]>(
    productSpecifications.map((x) => x.specificationId) || []
  );

  // existingSpecifications ??
  // [{ specificationId: "", specificationName: "", specificationValue: "" }]

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

            setExistingIds([...existingIds, value.id]);
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
        productSpecificationIds={existingIds}
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

  const handleSubmitSpecifications = (e: React.FormEvent) => {
    e.preventDefault();

    if (specificationsData) {
      if (handleAddSpecifications && isAdd) {
        handleAddSpecifications(
          specificationsData.map(
            (x: IProductSpecificationInput): IProductSpecification => {
              return {
                id: "",
                productId: "",
                specificationId: x.specificationId,
                specificationName: x.specificationName,
                specificationValue: x.specificationValue,
              };
            }
          )
        );
      } else {
        addSpecification({
          productId,
          data: specificationsData,
        });
      }
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmitSpecifications}
      action=""
      className="flex flex-col gap-4 h-full max-h-[600px]"
    >
      <div className="border p-4 rounded-md border-blue-500 flex flex-col gap-4 overflow-y-scroll h-full">
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
