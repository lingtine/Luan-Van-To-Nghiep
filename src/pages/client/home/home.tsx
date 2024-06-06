import Banner from "./Banner";
import Categories from "./Categories";
import BoxTemplate from "components/box-template/box-template";
import { Button } from "@material-tailwind/react";
import CoreValue from "./Corevalue";
import ProductsCarousel from "components/products/product-carousel";

import { useGetProductHomeQuery } from "redux/api/catalog/product";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isSuccess } = useGetProductHomeQuery({});

  let renderData;
  if (isSuccess) {
    renderData = data.map((item: any) => {
      const action = (
        <a href={item.href}>
          <Button size="sm">Xem Tất Cả</Button>
        </a>
      );

      return (
        <BoxTemplate
          title={item.groupName}
          heading={item.groupName}
          key={item.id}
          action={action}
        >
          <ProductsCarousel lengthCarousel={4} products={item.products} />
        </BoxTemplate>
      );
    });
  }

  return (
    <div className="container">
      <Banner />
      <Categories />
      {renderData}
      <CoreValue />
    </div>
  );
};

export default Home;
