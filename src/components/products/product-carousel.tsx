import ProductCard from "./product-card";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { useState } from "react";
import { IProductDetailType } from "redux/api/types";
interface ProductsCarouselProps {
  products: IProductDetailType[];
  lengthCarousel: number;
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  products,
  lengthCarousel = 4,
}) => {
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const onPrev = () => {
    if (carouselIndex > 0) setCarouselIndex(carouselIndex - 1);
  };
  const onNext = () => {
    setCarouselIndex(carouselIndex + 1);
  };

  const renderProducts = products.map((product, index) => {
    return (
      <div
        key={product.id}
        className="lg:max-w-[25%] lg:flex-[0_0_25%] md:max-w-[50%] md:flex-[0_0_50%] flex-[0_0_100%]
        md:px-4 max-w-full  flex-shrink-0   duration-700 ease-in-out h-fit"
        style={{
          transform: `translateX(calc(-${100 * carouselIndex}% ) )`,
        }}
      >
        <ProductCard data={product} />
      </div>
    );
  });

  return (
    <div className="w-full h-full px-4 relative flex items-center gap-4 justify-between">
      <button
        title="prev"
        onClick={onPrev}
        className="cursor-auto z-20 text-2xl"
        disabled={carouselIndex === 0}
      >
        <FiArrowLeftCircle />
      </button>
      <div className={`flex lg:-mx-4 overflow-hidden cursor-auto`}>
        {renderProducts}
      </div>
      <button
        title="next"
        onClick={onNext}
        className="cursor-auto z-20 text-2xl disabled:opacity-2"
        disabled={carouselIndex === products.length - lengthCarousel - 1}
      >
        <FiArrowRightCircle />
      </button>
    </div>
  );
};

export default ProductsCarousel;
