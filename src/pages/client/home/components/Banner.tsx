import React from "react";
import {
  Button,
  Card,
  Carousel,
  IconButton,
  Rating,
} from "@material-tailwind/react";
import { useGetProductCarouselQuery } from "redux/api/catalog/product";
import { Link } from "react-router-dom";
interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
  const { data, isSuccess, isLoading } = useGetProductCarouselQuery();

  if (isSuccess) {
    const content = data.map((product) => {
      return (
        <Card
          key={product.id}
          className="p-16 flex items-center bg-gradient-to-r from-[#ADCCEE] to-[#E6F0FD] w-full h-full max-h-[600px]"
        >
          <div className="h-[600px] flex items-center justify-between w-full">
            <div className="flex gap-4 flex-col pr-8 max-w-[50%]">
              <h3 className="text-2xl font-semibold text-secondary-text-emphasis">
                {product.name}
              </h3>
              <Rating readonly value={Math.round(product.numberOfStar)} />
              <Link to={`/product-detail/${product.id}`}>
                <Button className="bg-primary" size="lg">
                  Mua Ngay
                </Button>
              </Link>
            </div>

            <div className="flex-1 flex justify-center h-full">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-contain max-w-80"
              />
            </div>
          </div>
        </Card>
      );
    });

    return (
      <Carousel
        autoplay={true}
        autoplayDelay={4000}
        loop
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4 text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        {content}
      </Carousel>
    );
  } else if (isLoading) {
    return (
      <div className="h-[600px] w-full animate-pulse place-items-center rounded-lg bg-gray-300"></div>
    );
  }

  return <></>;
};

export default Banner;
