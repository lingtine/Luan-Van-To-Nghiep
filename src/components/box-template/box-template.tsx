import ProductList from "components/products/product-list";
import React from "react";
import {
  useGetProductHomeQuery
} from "redux/api/catalog/product";
interface BoxTemplateProps {
  heading: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  data?: any
}

const BoxTemplate: React.FC<BoxTemplateProps> = ({
  heading,
  title,
  action,
  children,
  data
}) => {
  console.log('box', data);
  
  const HeaderContent: React.FC = () => {
    return (
      <div className="flex justify-between items-end">
        <div>
          <div className="relative before:absolute before:bg-secondary-3 before:content-[''] before:h-10 before:w-5 before:rounded  h-10 flex items-center">
            <h3 className="pl-8 text-secondary-3 font-semibold text-base ">
              {heading}
            </h3>
          </div>

          <h1 className="text-4xl mt-5 font-semibold mb-4">{title}</h1>
        </div>
       
      </div>
    );
  };

  return (
    <>
    <div className="py-20 border-t">
      <HeaderContent />
      {children}
    </div>
    </>
  );
};

export default BoxTemplate;
