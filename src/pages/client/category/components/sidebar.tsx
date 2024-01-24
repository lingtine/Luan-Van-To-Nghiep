import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "redux/api/catalog/category";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
  Radio,
  Checkbox,
} from "@material-tailwind/react";
import { ICategory } from "redux/api/types";
interface SidebarProps {
  categories: ICategory[] | null;
  onChangeCategories: Function;
  isInStock: { status: boolean } | null;
  onChangeIsInStock: Function;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  onChangeCategories,
  isInStock,
  onChangeIsInStock,
}) => {
  const { categoryId } = useParams();

  const { data, isSuccess } = useGetCategoriesQuery({
    GroupId: categoryId,
    PageSize: 100,
  });
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  let content;
  if (isSuccess) {
    content = (
      <Accordion
        open={open === 1}
        icon={
          open === 1 ? (
            <LuMinus strokeWidth={2.5} />
          ) : (
            <GoPlus strokeWidth={2.5} />
          )
        }
      >
        <ListItem className="p-0" selected={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-b-0 p-3 text-md"
          >
            <p>Danh mục sản phẩm</p>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            {data.data.map((item) => {
              const isChecked = categories?.find((category) => {
                return category.id === item.id;
              });

              return (
                <ListItem
                  onClick={() => {
                    onChangeCategories(item);
                  }}
                  key={item.id}
                >
                  <Checkbox
                    checked={!!isChecked}
                    crossOrigin={""}
                    name={"category"}
                  />
                  <p>{item.name}</p>
                </ListItem>
              );
            })}
          </List>
        </AccordionBody>
      </Accordion>
    );
  }

  return (
    <aside className="p-4">
      <div>{content}</div>
      <div>
        <Accordion
          open={open === 2}
          icon={
            open === 2 ? (
              <LuMinus strokeWidth={2.5} />
            ) : (
              <GoPlus strokeWidth={2.5} />
            )
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3 text-md"
            >
              <p>Trạng thái sản phẩm</p>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                onClick={() => {
                  if (!isInStock) {
                    onChangeIsInStock(true);
                  } else {
                    onChangeIsInStock(null);
                  }
                }}
              >
                <Radio
                  checked={isInStock?.status}
                  crossOrigin={""}
                  name={"stock"}
                />
                <p>Còn hàng</p>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
      </div>
    </aside>
  );
};

export default Sidebar;
