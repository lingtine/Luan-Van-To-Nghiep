import React from "react";
import { BsHouse } from "react-icons/bs";
import { BsMinecartLoaded } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useState } from "react";

import { BsChevronDown } from "react-icons/bs";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
interface SlideBarProps {}

const SlideBar: React.FC<SlideBarProps> = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  const navigation = [
    {
      label: "Dashboard",
      href: "/admin",
      current: true,
      icon: <BsHouse />,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      current: false,
      icon: <BsCart />,
    },
    {
      label: "Customer",
      href: "/admin/customers",
      current: false,
      icon: <BiUserCircle />,
    },
    {
      label: "Product Management",
      current: false,
      icon: <BsMinecartLoaded />,
      children: [
        {
          label: "Category",
          href: "category",
        },
        {
          label: "Products",
          href: "products",
        },
        {
          label: "Category group",
          href: "category-group",
        },
        {
          label: "Brand",
          href: "brand",
        },
      ],
    },
  ];

  const renderNavigation = navigation.map((item, index) => {
    if (item.children) {
      const renderChildren = item.children.map((item, index) => {
        return (
          <NavLink key={index} to={item.href}>
            <ListItem key={item.label}>{item.label}</ListItem>
          </NavLink>
        );
      });

      return (
        <Accordion
          key={index}
          open={open === 1}
          icon={
            <BsChevronDown
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
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
        <ListItem>
          <ListItemPrefix>{item.icon}</ListItemPrefix>
          {item.label}
        </ListItem>
      </NavLink>
    );
  });

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          TeachWave
        </Typography>
      </div>

      <List>
        {renderNavigation}
        <ListItem>
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
