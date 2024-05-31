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
      <h4 className="text-xl font-bold mb-4">Thông số kỹ thuật</h4>
      <ul className="[&>*:nth-child(odd)]:bg-[#f2f2f2] rounded-lg border border-gray-300">
        {data.map((item, index) => {
          return (
            <li
              className={`flex text-sm px-4 py-2 items-center gap-4 justify-between h-16
              ${
                index === 0 ? 'rounded-t-lg' : ''
              } ${index === data.length - 1 ? 'rounded-b-lg' : ''}
              `}
              key={item.id}
            >
              <span 
              className="py-4 flex[0_0_50%] h-full"
              >
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
