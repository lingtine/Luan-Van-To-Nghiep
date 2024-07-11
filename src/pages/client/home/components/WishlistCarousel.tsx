import { useGetWishlistQuery } from "redux/api/auth/customer-api";
import HomeProductBox from "./HomeProductBox";

const WishlistCarousel = () => {
  const { data, isSuccess } = useGetWishlistQuery([]);
  return (
    <>
      {isSuccess && (
        <HomeProductBox
          heading={"Danh sách yêu thích"}
          title={"Danh sách yêu thích"}
          products={data}
        />
      )}
    </>
  );
};

export default WishlistCarousel;
