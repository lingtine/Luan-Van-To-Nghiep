import { useGetWishlistQuery } from "redux/api/auth/customer-api";
import HomeProductBox from "./components/HomeProductBox";
import { IWishlistProduct } from "redux/api/types";
import { IProductDetail } from "share/types/product";
import { IBrand } from "share/types/brand";
import { ICategory } from "share/types/category";

const WishlistCarousel = () => {
  const { data, isSuccess } = useGetWishlistQuery([]);
  return (
    <>
      {isSuccess && (
        <HomeProductBox
          heading={"Danh sách yêu thích"}
          title={"Danh sách yêu thích"}
          products={data.map((x: IWishlistProduct): IProductDetail => {
            return {
              brand: {} as IBrand,
              category: {} as ICategory,
              id: x.id,
              isActive: x.isActive,
              isInStock: x.isInStock,
              likeCount: x.likeCount,
              name: x.name,
              numberOfStar: x.numberOfStar,
              productImages: [],
              description: x.description ?? "",
              unitPrice: x.unitPrice,
              imageUrl: x.imageUrl ?? "defaultImageUrl",
              productSpecifications: [],
              rateCount: x.numberOfStar,
              viewCount: x.viewCount,
              relatedProducts: [],
              sku: "",
            };
          })}
        />
      )}
    </>
  );
};

export default WishlistCarousel;
