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
          "max-w-[268px] flex-shrink-0  mx-4 duration-700 ease-in-out h-fit"
        )}
        style={{
          transform: `translateX(-${118 * carouselIndex}%)`,
        }}
      >
        <ProductCard data={product} />
      </div>
    );
  });

  return (
    <div className="w-full h-full ">
      <div className="flex justify-between">
        <IconButton onClick={onPrev} disabled={carouselIndex === 0}>
          <FiArrowLeftCircle />
        </IconButton>
        <IconButton
          onClick={onNext}
          disabled={carouselIndex === products.length - lengthCarousel - 1}
        >
          <FiArrowRightCircle />
        </IconButton>
      </div>
      <div className={`flex gap-2 overflow-hidden `}>{renderProducts}</div>
    </div>
  );
};

export default ProductsCarousel;
