import React from "react";

interface BoxTemplateProps {
  heading: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  data?: any;
}

const BoxTemplate: React.FC<BoxTemplateProps> = ({
  heading,
  title,
  children,
  data,
}) => {
  return (
    <div className="py-10 border-t">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="relative before:absolute before:bg-secondary-3 before:content-[''] before:h-10 before:w-5 before:rounded  h-10 flex items-center">
            <h3 className="pl-8 text-secondary-3 font-semibold text-xl ">
              {heading}
            </h3>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default BoxTemplate;
