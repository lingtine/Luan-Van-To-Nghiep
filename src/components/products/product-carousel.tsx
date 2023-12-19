import ProductCard from "./product-card";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { useState } from "react";
import { Button, IconButton, carousel } from "@material-tailwind/react";
import { IProductDetailType } from "redux/api/types";
import classNames from "classnames";
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
    console.log(carouselIndex);
  };

  const renderProducts = products.map((product, index) => {
    return (
      <div
        key={product.id}
        className={classNames(
          "lg:max-w-[25%] flex-[0_0_25%] lg:px-4 max-w-full  flex-shrink-0   duration-700 ease-in-out h-fit"
        )}
        style={{
          transform: `translateX(calc(-${100 * carouselIndex}% ) )`,
        }}
      >
        <ProductCard data={product} />
      </div>
    );
  });

  return (
    <div className="w-full h-full px-8 relative">
      <button
        onClick={onPrev}
        className="cursor-auto absolute top-[50%] z-20 text-2xl"
        disabled={carouselIndex === 0}
      >
        <FiArrowLeftCircle />
      </button>
      <button
        onClick={onNext}
        className="cursor-auto absolute top-[50%] right-0 z-20 text-2xl"
        disabled={carouselIndex === products.length - lengthCarousel - 1}
      >
        <FiArrowRightCircle />
      </button>

      <div className={`flex lg:-mx-4 overflow-hidden cursor-auto `}>
        {renderProducts}
      </div>
    </div>
  );
};

export default ProductsCarousel;
