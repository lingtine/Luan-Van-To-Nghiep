import { useGetProductHomeQuery } from "redux/api/catalog/product";
import { useAppSelector } from "redux/store";

import Banner from "./components/Banner";
import Categories from "./components/Categories";
import CoreValue from "./components/Corevalue";
import HomeProductBox from "./components/HomeProductBox";
import WishlistCarousel from "./components/WishlistCarousel";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const { data, isSuccess } = useGetProductHomeQuery({});
  const { user } = useAppSelector((state) => state.userSlice);
  let renderData;
  if (isSuccess) {
    renderData = data.map((item: any, index) => (
      <HomeProductBox
        key={index}
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
      {user && <WishlistCarousel />}
      <CoreValue />
    </div>
  );
};

export default Home;
