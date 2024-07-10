import { Button } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";

interface IHeaderCategory {
  onClose?: Function;
}

const HeaderCategory: React.FC<IHeaderCategory> = ({ onClose }) => {
  const { data, isSuccess } = useGetAllCategoryGroupsQuery();

  if (isSuccess) {
    return (
      <ul className="hidden lg:flex">
        {data.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`/category/${category.id}`}
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              {({ isActive }) => {
                return (
                  <Button
                    className="flex opacity-1 whitespace-nowrap"
                    variant={isActive ? "filled" : "text"}
                    size="lg"
                    ripple={false}
                  >
                    {category.name}
                  </Button>
                );
              }}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
  return <></>;
};

export default HeaderCategory;
