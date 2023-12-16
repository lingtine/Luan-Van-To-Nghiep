import React from "react";
import { BsHouse } from "react-icons/bs";
import { BsMinecartLoaded } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useLogoutMutation } from "redux/api/auth/authApi";
import { useAppSelector } from "redux/store";
import { useNavigate } from "react-router-dom";

interface SlideBarProps {}

const SlideBar: React.FC<SlideBarProps> = () => {
  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();
  const { refreshToken } = useAppSelector((state) => state.authSlice);

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const navigation = [
    // {
    //   label: "Dashboard",
    //   href: "/admin",
    //   current: true,
    //   icon: <BsHouse />,
    // },
    {
      label: "Quản lý đơn hàng",
      href: "/admin/orders",
      current: false,
      icon: <BsCart />,
    },
    {
      label: "Quản lý khách hàng",
      href: "/admin/customers",
      current: false,
      icon: <BiUserCircle />,
    },
    {
      label: "Quản lý sản phẩm",
      current: false,
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
      current: false,
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
        {
          label: "Thông kê",
          href: "statistical",
        },
      ],
    },
    {
      label: "Quản lý mã giảm giá",
      current: false,
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
      current: false,
      icon: <BiSolidDiscount />,
      children: [
        {
          label: "Thông kê đơn hàng",
          href: "report-order",
        },
        {
          label: "Thông kế sản phẩm",
          href: "report-product",
        },
      ],
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      navigate("/login-admin");
    }
  }, [isSuccess, navigate]);
  const renderNavigation = navigation.map((item, index) => {
    if (item.children) {
      const renderChildren = item.children.map((item, index) => {
        return (
          <NavLink key={index} to={item.href}>
            <ListItem className="text-secondary" key={item.label}>
              {item.label}
            </ListItem>
          </NavLink>
        );
      });

      return (
        <Accordion
          className="text-secondary"
          key={index}
          open={open === index}
          icon={
            <BsChevronDown
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === index ? "rotate-0" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0 text-secondary" selected={open === index}>
            <AccordionHeader
              onClick={() => handleOpen(index)}
              className="border-b-0 p-3 text-secondary"
            >
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              <Typography className="mr-auto font-normal">
                {item.label}
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">{renderChildren}</List>
          </AccordionBody>
        </Accordion>
      );
    }
    return (
      <NavLink key={index} to={item.href}>
        <ListItem className="text-secondary">
          <ListItemPrefix>{item.icon}</ListItemPrefix>
          {item.label}
        </ListItem>
      </NavLink>
    );
  });

  return (
    <Card className="fixed rounded-none  h-full bg-[#22345e] min-w-fit z-10 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" className="text-secondary">
          TeachWave
        </Typography>
      </div>

      <List>
        {renderNavigation}
        <ListItem
          className="text-secondary"
          onClick={() => {
            logout({ refreshToken });
          }}
        >
          <ListItemPrefix>
            <IoExitOutline />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default SlideBar;
