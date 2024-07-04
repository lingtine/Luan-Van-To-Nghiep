import React from "react";
import Table from "components/table/table";
import { useFormatPrice } from "hooks/use-format-price";
import { Link } from "react-router-dom";
import { IProductOrder } from "share/types/product";
import { FaRegTrashCan } from "react-icons/fa6";
import CartInputQuantity from "./cart-input-quantily";
import { IconButton } from "@material-tailwind/react";

import { useDeleteItemsMutation } from "redux/api/cart/cart";
interface TableProductsProps {
  listProducts: IProductOrder[];
}

const TableProducts: React.FC<TableProductsProps> = ({ listProducts }) => {
  const [formPrice] = useFormatPrice();
  const [deleteProduct] = useDeleteItemsMutation();
  const configTable = [
    {
      label: "Hình ảnh",
      render: (data: IProductOrder) => {
        return <img src={data.imageUrl} alt="" width={100} height={100} />;
      },
    },
    {
      label: "Sản phẩm",
      render: (data: IProductOrder) => {
        return data.name;
      },
    },
    {
      label: "Giá",
      render: (data: IProductOrder) => {
        return formPrice.format(data.unitPrice);
      },
    },
    {
      label: "Số lượng",
      render: (data: IProductOrder) => {
        return <CartInputQuantity data={data} />;
      },
    },

    {
      label: "Số tiền",
      render: (data: IProductOrder) => {
        return formPrice.format(data.quantity * data.unitPrice);
      },
    },
    {
      label: "",
      render: (data: IProductOrder) => {
        return (
          <IconButton
            color="red"
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
        Giỏ Hàng ({listProducts.length + " sản phẩm"})
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
