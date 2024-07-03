import React from "react";
import { Button, Carousel, IconButton } from "@material-tailwind/react";
import { useGetProductCarouselQuery } from "redux/api/catalog/product";
import { Link } from "react-router-dom";
interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
  const { data, isSuccess } = useGetProductCarouselQuery();

  if (isSuccess) {
    const content = data.map((product) => {
      return (
        <div
          key={product.id}
          className="flex w-full h-full flex-col md:flex-row items-center gap-16"
        >
          <div className="flex-[0_0_50%] flex gap-4 flex-col  pr-8">
            <h3 className="text-2xl font-semibold ">{product.name}</h3>
            <p className=" line-clamp-2 text-sm ">{product.description}</p>
            <Link to={`/product-detail/${product.id}`}>
              <Button size="lg"> Mua Ngay</Button>
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={
                product.imageUrl ||
                "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/t/gtt_7766_3__1_5.jpg"
              }
              alt={product.name}
              className="h-full w-full object-cover max-w-sm"
            />
          </div>
        </div>
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
  }

  return <></>;
};

export default Banner;
