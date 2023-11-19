import React, { useState } from "react";
import ProductCard from "./product-card";

export default function ProductsList() {
//   const [items, setItems] = useState<Array<React.ReactNode>>();
  const cartItems = Array.from({ length: 10 }, (_, index) => (
    <ProductCard key={index} data={undefined} />
  ));


  return (
    cartItems && (
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {cartItems.map((item, index) => (
          <a key={index} href="/products/detail/id" className="cursor-pointer hover:shadow-xl hover:transform hover:scale-105 duration-300">{item}</a>
        ))}
      </div>
    )
  );
}
