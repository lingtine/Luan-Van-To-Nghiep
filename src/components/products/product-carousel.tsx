import ProductCard from "./product-card";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { useState } from "react";
import { IconButton } from "@material-tailwind/react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = products.length - lengthCarousel;

  const onPrev = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  const onNext = () => {
    if (currentIndex >= maxIndex) return;
    setCurrentIndex(currentIndex + 1);
  };

  const renderProducts = products.map((product, index) => (
    <div
      key={product.id}
      className={classNames(
        `w-[270px] flex-shrink-0  mx-4 tra duration-700 ease-in-out h-fit`,
        `translate-x-[${currentIndex * 112}%]`
      )}
    >
      <ProductCard data={product} />
    </div>
  ));

  return (
    <div className="relative flex w-full overflow-x-hidden py-8">
      {renderProducts}
      <div>
        <IconButton
          onClick={onPrev}
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none text-2xl "
        >
          <FiArrowLeftCircle />
        </IconButton>
        <IconButton
          onClick={onNext}
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-2 cursor-pointer group focus:outline-none text-2xl"
        >
          <FiArrowRightCircle />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductsCarousel;
