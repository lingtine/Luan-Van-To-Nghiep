import { Button } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";

interface IHeaderCategory {
  onClose?: Function;
}

const HeaderCategory: React.FC<IHeaderCategory> = ({ onClose }) => {
  const { data, isSuccess } = useGetAllCategoryGroupsQuery(null);

  return (
    <>
      {isSuccess &&
        data.map((category) => (
          <li key={category.id}>
            <NavLink
              to={`/category/${category.id}`}
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              {({ isActive, isPending, isTransitioning }) => {
                return (
                  <Button
                    className="flex opacity-1"
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
    </>
  );
};

export default HeaderCategory;
