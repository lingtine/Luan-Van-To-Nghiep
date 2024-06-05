import ProductCard from "components/products/product-card";
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { IProductDetailType } from "redux/api/types";

interface IRelatedCarousel {
  products: IProductDetailType[];
  lengthCarousel: number;
}

const RelatedCarousel = ({
  products,
  lengthCarousel = 4,
}: IRelatedCarousel) => {
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
        className="max-w-full flex-shrink-0 duration-700 ease-in-out h-fit"
        style={{
          transform: `translateX(calc(-${100 * carouselIndex}% ) )`,
        }}
      >
        <ProductCard data={product} />
      </div>
    );
  });

  return (
    <div className="relative flex items-center justify-between w-full h-full gap-4">
      <button
        title="prev"
        onClick={onPrev}
        className="z-20 text-2xl cursor-auto"
        disabled={carouselIndex === 0}
      >
        <FiArrowLeftCircle />
      </button>
      <div className="w-full flex items-center justify-start overflow-hidden cursor-auto lg:-mx-4 scroll-smooth gap-4">
        {renderProducts}
      </div>
      <button
        title="next"
        onClick={onNext}
        className="z-20 text-2xl cursor-auto disabled:opacity-2"
        disabled={carouselIndex === products.length - lengthCarousel - 1}
      >
        <FiArrowRightCircle />
      </button>
    </div>
  );
};

export default RelatedCarousel;
