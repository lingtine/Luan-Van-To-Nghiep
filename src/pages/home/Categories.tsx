import React from "react";
import BoxTemplate from "components/box-template/box-template";

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const Action: React.FC = () => {
    return <div>action</div>;
  };
  return (
    <>
      <BoxTemplate
        title="Tìm kiếm bằng danh mục"
        heading="Thể loại"
        action={<Action />}
      >
        <div>hello</div>
      </BoxTemplate>
    </>
  );
};

export default Categories;
