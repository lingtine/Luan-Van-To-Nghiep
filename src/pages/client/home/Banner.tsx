import React from "react";
import { Carousel } from "@material-tailwind/react";
interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
  return (
    <Carousel autoplay={true} autoplayDelay={4000} loop>
      <img
        src="images/banner/iphone-15.jpg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
      <img
        src="images/banner/iphone-15.jpg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src="images/banner/iphone-15.jpg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
};

export default Banner;
