import { BiStoreAlt } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";

import { HiOutlineShoppingBag } from "react-icons/hi2";

const dataInfo: {
  id: string;
  icon: React.ReactNode;
  value: number;
  label: string;
}[] = [
  {
    id: Math.random().toString(),
    icon: <BiStoreAlt />,
    value: 10.5,
    label: "Sallers hoạt động trang web của chúng tôi",
  },
  {
    id: Math.random().toString(),
    icon: <CiDollar />,
    value: 33,
    label: "Bán sản phẩm hàng tháng",
  },
  {
    id: Math.random().toString(),
    icon: <HiOutlineShoppingBag />,
    value: 45.5,
    label: "Khách hàng hoạt động trong trang web của chúng tôi",
  },
  {
    id: Math.random().toString(),
    icon: <CiDollar />,
    value: 25,
    label: "Tổng doanh thu hàng năm trên trang web của chúng tôi",
  },
];

const dataUser: {
  id: string;
  imageUrl: string;
  name: string;
  role: string;
}[] = [
  {
    id: Math.random().toString(),
    imageUrl: "http://ecommerce.quochao.id.vn/images/about/tom-cruise.png",
    name: "Tom Cruise",
    role: "Người sáng lập & Chủ tịch",
  },
  {
    id: Math.random().toString(),
    imageUrl: "http://ecommerce.quochao.id.vn/images/about/Emma-watson.png",
    name: "Emma Watson",
    role: "Giám đốc điều hành",
  },
  {
    id: Math.random().toString(),
    imageUrl: "http://ecommerce.quochao.id.vn/images/about/will-smith.png",
    name: "Will Smith",
    role: "Người thiết kế sản phẩm",
  },
];

export { dataInfo, dataUser };
