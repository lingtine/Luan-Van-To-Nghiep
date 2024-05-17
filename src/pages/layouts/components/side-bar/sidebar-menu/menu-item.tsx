import { NavLink } from "react-router-dom";

import { BsChevronDown } from "react-icons/bs";
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
        <NavLink key={index} to={item.href || ""}>
          <ListItem className="text-secondary" key={item.label}>
            {item.label}
          </ListItem>
        </NavLink>
      );
    });

    return (
      <Accordion
        open={open === index}
        className="text-secondary"
        icon={
          <BsChevronDown
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform `}
          />
        }
      >
        <ListItem className="p-0 text-secondary">
          <AccordionHeader
            onClick={handleOpen}
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
    <NavLink to={item.href || ""}>
      <ListItem className="text-secondary">
        <ListItemPrefix>{item.icon}</ListItemPrefix>
        {item.label}
      </ListItem>
    </NavLink>
  );
};

export default MenuItem;
