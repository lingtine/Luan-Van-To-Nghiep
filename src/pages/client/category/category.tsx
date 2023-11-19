import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "redux/api/catalog/product";
interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { categoryId } = useParams();

  return <div></div>;
};

export default CategoryPage;
