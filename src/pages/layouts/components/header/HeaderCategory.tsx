import React from "react";
import {
  MdHeadphones,
  MdLaptopChromebook,
  MdPhoneIphone,
  MdScreenshotMonitor,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { useTranslation, Trans } from 'react-i18next';
export default function HeaderCategory() {
  const { t } = useTranslation();
  const { data, isSuccess } = useGetAllCategoryGroupsQuery(null);
  const getIconByCategory = (categoryName : string) => {
    switch (categoryName) {
      case t("laptop"):
        return <MdLaptopChromebook  className="text-2xl mr-2" />;
      case t("screen"):
        return <MdScreenshotMonitor  className="text-2xl mr-2" />;
      case t("items"):
        return <MdHeadphones  className="text-2xl mr-2" />;
      case t("phone"):
        return <MdPhoneIphone className="text-2xl mr-2" />;
      default:
        return null; // You can return a default icon or nothing if no match
    }
  };
  return (
    <ul className="flex justify-center py-8 gap-6">
      {isSuccess &&
        data.map((category) => (
          <Link to={`/category/${category.id}/1`}
            className={`flex px-3 text-2xl items-center w-48 border-r border-r-white-400 hover:text-primary transition duration-300 ease-out cursor-pointer`}
          >
            
            {getIconByCategory(category.name)}
            {category.name}
          </Link>
        ))}
    </ul>
  );
}
