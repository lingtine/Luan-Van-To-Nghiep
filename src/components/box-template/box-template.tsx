import React from "react";

interface BoxTemplateProps {
  heading: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const BoxTemplate: React.FC<BoxTemplateProps> = ({
  heading,
  title,
  action,
  children,
}) => {
  const HeaderContent: React.FC = () => {
    return (
      <div className="flex justify-between items-end">
        <div>
          <div className="relative before:absolute before:bg-secondary-3 before:content-[''] before:h-10 before:w-5 before:rounded  h-10 flex items-center">
            <h3 className="pl-8 text-secondary-3 font-semibold text-base ">
              {heading}
            </h3>
          </div>

          <h1 className="text-4xl mt-5 font-semibold">{title}</h1>
        </div>
        {action}
      </div>
    );
  };

  return (
    <div className="py-20 border-t">
      <HeaderContent />
      {children}
    </div>
  );
};

export default BoxTemplate;
