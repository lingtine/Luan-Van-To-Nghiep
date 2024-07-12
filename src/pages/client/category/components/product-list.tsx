import React from "react";
import { IProductDetail } from "share/types/product";
import ProductCard from "components/products/product-card";
interface ProductListProps {
  data: IProductDetail[];
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <div className="container flex flex-wrap -m-1 md:-m-2">
      {data.map((product) => {
        return (
          <div
            key={product.id}
            className="flex-[0_0_100%] max-w-[100%] lg:flex-[0_0_50%] lg:max-w-[50%] xl:flex-[0_0_33.33333%] xl:max-w-[33.33333%]  p-1 md:p-2"
          >
            <ProductCard data={product} />
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
