import { useParams } from "react-router-dom";

import { useGetProductDetailQuery } from "redux/api/catalog/product";
import { useAppSelector } from "redux/store";

import ProductReview from "./components/ProductReview";
import ProductSpecification from "./components/ProductSpecification";
import ProductDetailSkeleton from "components/skeleton/product-detail-skeleton";
import ProductImage from "./components/ProductImage";
import ProductWishList from "./components/product-wish-list";
import ProductDetailRightSide from "./components/product-detail-right-side";
import HtmlRenderer from "components/TextEditor/HtmlRender";

function ProductDetailPage() {
  const { productId } = useParams();

  const { user } = useAppSelector((state) => state.userSlice);

  const { data, isLoading, isSuccess } = useGetProductDetailQuery(
    productId || "",
    {
      refetchOnFocus: true,
    }
  );

  let content;

  if (isLoading) {
    content = <ProductDetailSkeleton />;
  } else if (isSuccess) {
    content = (
      <>
        <div className="px-4 sm:px-6 lg:px-8 mt-6 flex flex-col lg:flex-row gap-4 max-h-[400px] h-[400px]">
          <div className="basis-1/2  py-8 px-4 flex flex-col gap-4 border shadow-md rounded-lg relative">
            {user && <ProductWishList productId={data.id} />}

            <ProductImage
              mainImage={data.imageUrl}
              relatedImages={data.productImages}
            />
          </div>
          <ProductDetailRightSide
            isInStock={data.isInStock}
            numberOfStar={data.numberOfStar}
            productId={data.id}
            productName={data.name}
            unitPrice={data.unitPrice}
            viewCount={data.viewCount}
          />
        </div>

        <div className="sm:px-6 lg:px-8 mt-6 lg:flex-row flex flex-col gap-4 justify-between">
          <div className="flex flex-col basis-2/3 gap-4">
            {/* Related products */}
            {/* {isSuccess && data && data.relatedProducts && (
                  
                )} */}
            {/* <div>
                  <ProductsCarousel products={[data]} lengthCarousel={10} />
                </div> */}
            {/* <div className="w-full min-h-fit h-fit shadow-md rounded-lg border border-gray-300 mb-4 p-4">
                  {data.relatedProducts && (
                    <RelatedCarousel
                      products={data.relatedProducts}
                      lengthCarousel={2}
                    />
                  )}
                </div> */}
            {/* Description */}
            {/* <div className="w-full min-h-fit h-fit shadow-md rounded-lg border border-gray-300 mb-4 p-4">
                  
                </div> */}
            {data.description && (
              <div className="w-full min-h-fit h-fit shadow-md rounded-lg border border-gray-300 mb-4 p-4">
                <HtmlRenderer htmlContent={data.description} />
              </div>
            )}

            {/* Review */}
            <div
              className="w-full
                shadow-md rounded-lg 
                border border-gray-300"
            >
              <ProductReview productId={data.id} />
            </div>
          </div>

          <ProductSpecification data={data.productSpecifications} />
        </div>
      </>
    );
  }
  return <div className="container mx-auto my-20"> {content}</div>;
}

export default ProductDetailPage;
