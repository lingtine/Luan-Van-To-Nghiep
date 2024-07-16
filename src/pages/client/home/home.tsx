import { useGetProductHomeQuery } from "redux/api/catalog/product";

import Banner from "./components/Banner";
import CoreValue from "./components/Corevalue";
import HomeProductBox from "./components/HomeProductBox";
import { v4 as uuid } from "uuid";
import ProductCarousel from "components/skeleton/product-carousel-skeleton";
import { Key } from "react";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isSuccess, isLoading } = useGetProductHomeQuery({});
  let renderData;
  if (isLoading) {
    renderData = Array(4)
      .fill(0)
      .map((_, index) => {
        const id = uuid();
        return <ProductCarousel key={id + index} />;
      });
  } else if (isSuccess) {
    renderData = data.map((item: any, index: Key | null | undefined) => (
      <HomeProductBox
        key={uuid()}
        heading={item.groupName}
        title={item.groupName}
        products={item.products}
      />
    ));
  }

  return (
    <div className="container">
      <Banner />
      {/* <Categories /> */}
      {renderData}

      <CoreValue />
    </div>
  );
};

export default Home;
