import React from "react";
import { IProductSpecifications } from "redux/api/types";
interface ProductSpecificationProps {
  data: IProductSpecifications[];
}

const ProductSpecification: React.FC<ProductSpecificationProps> = ({
  data,
}) => {
  return (
    <>
      <h4 className="text-xl font-bold my-4">Thông số sản phẩm</h4>
      <ul>
        {data.map((item) => {
          return (
            <li
              className="flex  text-sm px-2 items-center  gap-4 justify-between border border-primary-1"
              key={item.id}
            >
              <span className="min-w-[50%] py-4 flex[0_0_50%] h-full border-r border-primary-1">
                {item.specificationName}
              </span>
              <span>{item.specificationValue}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProductSpecification;
