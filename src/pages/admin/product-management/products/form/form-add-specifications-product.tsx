import React from "react";
import { Button } from "@material-tailwind/react";
import { ISelected } from "components/select-box/select-box";
import { useState } from "react";
import { useGetSpecificationsQuery } from "redux/api/catalog/specification";
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
}

const FormAddSpecificationsProduct: React.FC<
  FormAddSpecificationsProductProps
> = ({ productId, onClose, productSpecifications, isAdd = false }) => {
  const [specificationsData, setSpecificationsData] = useState<
    IProductSpecificationInput[]
  >([{ specificationId: "", specificationName: "", specificationValue: "" }]);

  const [addSpecification] = useAddSpecificationForProductMutation();
  const { data, isSuccess } = useGetSpecificationsQuery({
    PageSize: 9999,
  });

  let renderSpecificationData;
  if (isSuccess) {
    const updateData = data.data
      .filter((item) => {
        return !productSpecifications.some(
          (specification) => specification.specificationId === item.id
        );
      })
      .map((item) => ({ ...item, label: item.name }));

    renderSpecificationData = specificationsData.map((item, index) => {
      const indexData = index;

      return (
        <InputSpecification
          specifications={updateData}
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
  }

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
      addSpecification({
        productId,
        data: specificationsData,
      });
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmitSpecifications}

      className="flex flex-col gap-4 h-[600px] max-h-[600px]"
    >
      <div className="border p-4 rounded-md border-blue-500 flex flex-col gap-4 h-full max-h-[600px] min-h-[320px] overflow-y-scroll">
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
