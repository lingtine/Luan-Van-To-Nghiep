import React, { useState } from "react";
import ProductCard from "./product-card";

export default function ProductsList() {
//   const [items, setItems] = useState<Array<React.ReactNode>>();
  const mockUp = {
    name: "Iphone 15",
    unitPrice:"100.000.000đ",
    description: "Kiểu dáng sang trọng thêm nhiều tính năng, chắc chắn sẽ mang đến cho bạn trải nghiệm tuyệt vời"
  } 
  const cartItems = Array.from({ length: 10 }, (_, index) => (
    <ProductCard key={index} data={mockUp} />
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
