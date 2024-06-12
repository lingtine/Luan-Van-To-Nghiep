import Banner from "./Banner";
import Categories from "./Categories";
import CoreValue from "./Corevalue";

import { useGetProductHomeQuery } from "redux/api/catalog/product";
import { useAppSelector } from "redux/store";
import HomeProductBox from "./HomeProductBox";
import WishlistCarousel from "./WishlistCarousel";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isSuccess } = useGetProductHomeQuery({});
  const { user } = useAppSelector((state) => state.userSlice);
  let renderData;
  if (isSuccess) {
    console.log(data);

    renderData = data.map((item: any) => (
      <HomeProductBox
        heading={item.groupName}
        title={item.groupName}
        products={item.products}
      />
    ));
  }

  return (
    <div className="container">
      <Banner />
      <Categories />
      {renderData}
      {user && <WishlistCarousel />}
      <CoreValue />
    </div>
  );
};

export default Home;
