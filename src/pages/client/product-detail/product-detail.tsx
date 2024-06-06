import { useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Rating } from "@material-tailwind/react";
import InputQuantity from "components/input/input-quantity";
import ProductDetailSkeleton from "components/skeleton/product-detail-skeleton";
import { useNavigate } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetDetailCartQuery,
} from "redux/api/cart/cart";
import { useGetProductDetailQuery } from "redux/api/catalog/product";
import { useAppSelector } from "redux/store";
import { formatVND } from "utils/formatVND";
import ProductReview from "./components/ProductReview";
import ProductSpecification from "./components/ProductSpecification";
import RelatedCarousel from "./components/RelatedCarousel";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
} from "redux/api/auth/customer-api";
import ProductImage from "./components/ProductImage";

function ProductDetailPage() {
  const [heart, setHeart] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.authSlice);
  const { data, isLoading, isSuccess } = useGetProductDetailQuery(
    productId || "",
    {
      refetchOnFocus: true,
    }
  );

  const [addWishlist, addWishlistResult] = useAddWishlistMutation();
  const [deleteWishlist, deleteWishlistResult] = useDeleteWishlistMutation();

  const { refetch } = useGetDetailCartQuery(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [addToCart] = useAddToCartMutation();

  async function handleAddToCart() {
    if (!accessToken) {
      toast.warning("Bạn cần phẩm đăng nhập trước");
      navigate("/login");
    } else {
      if (data) {
        const dataItem = {
          productId: data.id,
          productName: data.name,
          quantity: quantity,
          unitPrice: data.unitPrice,
        };
        try {
          await addToCart(dataItem);
          await refetch();
          if (isSuccess) {
            toast.success("Thêm vào giỏ hàng thành công");
          }
        } catch (error) {
          toast.error("Failed to add to cart");
        }
      }
    }
  }

  const handleHeart = () => {
    if (!accessToken) {
      toast.warning("Bạn cần phẩm đăng nhập trước");
      navigate("/login");
    } else {
      if (heart) {
        deleteWishlist(data!.id);
        setHeart(false);
      } else {
        addWishlist(data!.id);
        setHeart(true);
      }
    }
  };

  if (isSuccess) {
    return (
      <>
        {data && (
          <div className="container mx-auto my-20">
            {/* Main */}
            <div
              className="px-4 sm:px-6 lg:px-8 mt-6 flex flex-col lg:flex-row gap-4 max-h-[400px] h-[400px]"
            >
              <div className="basis-1/2  py-8 px-4 flex flex-col gap-4 border shadow-md rounded-lg relative">
                <button
                  className="absolute top-2 left-2 z-20"
                  onClick={handleHeart}
                >
                  {heart ? (
                    <svg
                      className="text-red-400 w-6 h-auto fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                    </svg>
                  ) : (
                    <svg
                      className="text-red-400 w-6 h-auto fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                    </svg>
                  )}
                </button>

                {/* <img
                  className="h-full w-full  max-h-[400px] object-contain "
                  src={
                    data.imageUrl ||
                    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_13__3_29.png"
                  }
                  alt={data.name}
                /> */}
                <ProductImage mainImage={data.imageUrl} relatedImages={data.productImages}/>
              </div>

              <div className="basis-1/2  py-8 px-4 flex flex-col gap-4 border shadow-md rounded-lg">
                {data.isInStock || (
                  <p className="bg-[#ff563029] rounded w-fit text-sm uppercase text-[#B71D18] font-bold p-2">
                    {"Hết hàng"}
                  </p>
                )}

                <h2 className="font-semibold text-xl text-primary-1 uppercase">
                  {data.name}
                </h2>
                <span className="flex items-center gap-4">
                  <Rating readonly value={data.numberOfStar} />
                  <p>{`(${data.viewCount} lượt xem)`} </p>
                </span>
                <p className="text-2xl">{formatVND(data.unitPrice)}</p>
                <div className="flex justify-between">
                  <h6>Số lượng</h6>

                  <InputQuantity
                    maxQuantity={99}
                    quantity={quantity}
                    onChange={setQuantity}
                  />
                </div>

                <div>
                  <Button
                    size="lg"
                    disabled={!data.isInStock}
                    color={data.isInStock ? "yellow" : "gray"}
                    onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <div className="flex py-4 space-x-4"></div>
              </div>
            </div>

            <div className="sm:px-6 lg:px-8 mt-6 lg:flex-row flex flex-col gap-4 justify-between">
              <div className="flex flex-col basis-2/3 gap-4">
                {/* Related products */}
                {/* {isSuccess && data && data.relatedProducts && (
                  
                )} */}

                {/* <div>
                  <ProductsCarousel products={[data]} lengthCarousel={10} />
                </div> */}

                {data.relatedProducts && (
                  <RelatedCarousel
                    products={data.relatedProducts}
                    lengthCarousel={2}
                  />
                )}

                {/* Description */}
                <div className="w-full min-h-fit h-fit shadow-md rounded-lg border border-gray-300 mb-4 p-4">
                  {data.description}
                </div>

                {/* Review */}
                <div
                  className="w-full
                shadow-md rounded-lg 
                border border-gray-300"
                >
                  <ProductReview productId={data.id} />
                </div>
              </div>

              <div
                className="flex flex-col basis-1/3 shadow-md p-4 h-fit
                border border-gray-300 rounded-lg overflow-hidden
                "
              >
                <ProductSpecification data={data.productSpecifications} />
                {/* <div>
                  <button
                    className="
                  bg-white border border-gray-300 text-gray-900
                    cursor-pointer flex justify-center items-center
                    w-full h-9 mt-4 px-4 py-3 text-center whitespace-nowrap duration-500 
                    rounded-lg shadow-sm text-sm gap-1.5 transition-colors
                    hover:shadow-lg 
                    "
                  >
                    Xem cấu hình chi tiết
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else if (isLoading) {
    return (
      <div className="container my-12 mx-auto">
        <ProductDetailSkeleton />
      </div>
    );
  }
  return <div></div>;
}

export default ProductDetailPage;
