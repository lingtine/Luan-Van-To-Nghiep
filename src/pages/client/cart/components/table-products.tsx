import React from "react";
import Table from "components/table/table";
import { useFormatPrice } from "hooks/use-format-price";
import { Link } from "react-router-dom";
import { IProductInOrder } from "redux/api/types";
import { FaRegTrashCan } from "react-icons/fa6";
import CartInputQuantity from "./cart-input-quantily";
import { IconButton } from "@material-tailwind/react";

import { useDeleteItemsMutation } from "redux/api/cart/cart";
interface TableProductsProps {
  listProducts: IProductInOrder[];
}

const TableProducts: React.FC<TableProductsProps> = ({ listProducts }) => {
  const [formPrice] = useFormatPrice();
  const [deleteProduct] = useDeleteItemsMutation();
  const configTable = [
    {
      label: "Sản phẩm",
      render: (data: IProductInOrder) => {
        return data.name;
      },
    },
    {
      label: "Giá",
      render: (data: IProductInOrder) => {
        return formPrice.format(data.unitPrice);
      },
    },
    {
      label: "Số lượng",
      render: (data: IProductInOrder) => {
        return <CartInputQuantity data={data} />;
      },
    },

    {
      label: "Số tiền",
      render: (data: IProductInOrder) => {
        return formPrice.format(data.quantity * data.unitPrice);
      },
    },
    {
      label: "",
      render: (data: IProductInOrder) => {
        return (
          <IconButton
            onClick={() => {
              deleteProduct(data.productId);
            }}
          >
            <FaRegTrashCan />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className="flex-1">
      <h3 className="text-xl my-4 font-semibold">
        Giỏ Hàng({listProducts.length + " sản phẩm"})
      </h3>
      <div>
        <Table config={configTable} data={listProducts} />
      </div>
      <div className="mt-4 ">
        <Link className="text-lg font-semibold hover:opacity-80" to="/">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default TableProducts;
