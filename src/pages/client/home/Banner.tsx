import React from "react";

interface BannerProps {}

const Banner: React.FC<BannerProps> = () => {
  return (
    <div className="container mx-auto px-4 flex">
      <div className="bg-black w-full">hello</div>
      <div className="relative overflow-hidden  w-full h-[404px] bg-black">
        <div className="absolute bg-banner-1 left-auto  w-full h-full bg-contain bg-no-repeat" />
      </div>
    </div>
  );
};

export default Banner;
