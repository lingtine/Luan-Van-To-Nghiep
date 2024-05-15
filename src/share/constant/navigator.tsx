import { BsMinecartLoaded } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { BsHouse } from "react-icons/bs";
import { FaSquarePollVertical } from "react-icons/fa6";

import { INavigator } from "share/types/navigator";

const navigation: INavigator[] = [
  {
    label: "Dashboard",
    href: "/admin",

    icon: <BsHouse />,
  },
  {
    label: "Quản lý đơn hàng",
    href: "/admin/orders",

    icon: <BsCart />,
  },
  {
    label: "Quản lý khách hàng",
    href: "/admin/customers",

    icon: <BiUserCircle />,
  },
  {
    label: "Quản lý sản phẩm",
    icon: <BsMinecartLoaded />,
    children: [
      {
        label: "Danh mục sản phẩm",
        href: "category",
      },
      {
        label: "Sản phẩm",
        href: "products",
      },
      {
        label: "Danh mục nhóm sản phẩm",
        href: "category-group",
      },
      {
        label: "Thương hiệu",
        href: "brand",
      },
      {
        label: "Đặt tả",
        href: "specifications",
      },
    ],
  },
  {
    label: "Quản lý kho",
    icon: <FaWarehouse />,
    children: [
      {
        label: "Kho",
        href: "warehouses",
      },
      {
        label: "Sản phẩm",
        href: "inventory",
      },
      {
        label: "Nhập xuất kho",
        href: "report",
      },

      {
        label: "Nhà cung cấp",
        href: "suppliers",
      },
    ],
  },
  {
    label: "Quản lý mã giảm giá",
    icon: <BiSolidDiscount />,
    children: [
      {
        label: "Mã giảm giá",
        href: "coupons",
      },
      {
        label: "Sự kiện giảm giá",
        href: "discountEvents",
      },
    ],
  },
  {
    label: "Thống kê",
    icon: <FaSquarePollVertical />,
    children: [
      {
        label: "Thống kê đơn hàng",
        href: "report-order",
      },
      {
        label: "Thống kê sản phẩm",
        href: "report-product",
      },
      {
        label: "Thống kê kho",
        href: "report-warehouse",
      },
    ],
  },
];

export { navigation };
