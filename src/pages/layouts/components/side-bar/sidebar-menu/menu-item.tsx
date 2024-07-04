import { NavLink } from "react-router-dom";

import { HiChevronLeft } from "react-icons/hi";

import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { INavigator } from "share/types/navigator";

interface MenuItemProps {
  item: INavigator;
  open: number;
  index: number;
  onOpen: (index: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, open, index, onOpen }) => {
  const handleOpen = () => {
    onOpen(index);
  };

  if (item.children) {
    const renderChildren = item.children.map((item, index) => {
      return (
        <NavLink
          key={index}
          to={item.href || ""}
          className={({ isActive }) =>
            isActive ? "bg-gray-800 text-white rounded-lg" : ""
          }
        >
          <ListItem
            className="focus:bg-gray-800 focus:text-white"
            key={item.label}
          >
            {item.label}
          </ListItem>
        </NavLink>
      );
    });

    return (
      <Accordion
        open={open === index}
        icon={
          <HiChevronLeft
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === index ? "-rotate-90" : ""
            }`}
          />
        }
      >
        <ListItem className="p-0">
          <AccordionHeader onClick={handleOpen} className="border-b-0 p-3 ">
            <ListItemPrefix>{item.icon}</ListItemPrefix>
            <Typography className="mr-auto font-normal">
              {item.label}
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List>{renderChildren}</List>
        </AccordionBody>
      </Accordion>
    );
  }
  return (
    <NavLink
      to={item.href || ""}
      className={({ isActive }) =>
        isActive ? "bg-gray-800 text-white rounded-lg" : ""
      }
      end
    >
      <ListItem className="focus:bg-gray-800 focus:text-white">
        <ListItemPrefix>{item.icon}</ListItemPrefix>
        {item.label}
      </ListItem>
    </NavLink>
  );
};

export default MenuItem;
