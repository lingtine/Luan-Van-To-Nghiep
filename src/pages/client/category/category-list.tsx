import ProductCard from "components/products/product-card";
import React, { useState } from "react";


export default function CategoryList({ data }: any) {
  console.log(data);
  
  return (
    (data)  && (
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {data.lenght !==0 ? (data.map((item: any, index: number) => (
          <a
            key={index}
            href={`/products/detail/${item.id}`}
            className="cursor-pointer hover:shadow-xl hover:transform hover:scale-105 duration-300"
          >
            <ProductCard key={index} data={item} />
          </a>
        ))) : <div>Không có sản phẩm nào trong list ....</div>}
      </div>
    )
  );
}
