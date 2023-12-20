import React from "react";
import Image from "next/image";
import Banner1 from '@/public/images/banner1.jpg';
import Banner2 from '@/public/images/banner2.jpg';
import Banner3 from '@/public/images/banner3.jpg';
import Banner4 from '@/public/images/banner4.jpg';

export default function Hero() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex justify-center">
        <div className="carousel w-[70%] md:h-[450px] lg:h-[500px] rounded-xl my-8 ">
          <div id="slide1" className="carousel-item relative w-full">
          <Image className="w-full" src="https://static.pib.gov.in/WriteReadData/userfiles/image/image001SRFW.jpg" alt="Description"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle hover:btn-primary">❮</a>
              <a href="#slide2" className="btn btn-circle hover:btn-primary">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
          <Image className="w-full" src='https://images.thequint.com/thequint%2F2022-11%2F241ac0a8-9317-4d4f-83ea-cca724bcc14a%2FUntitled_design__4_.png?auto=format%2Ccompress&fmt=webp&width=720&w=1200' alt="Banner2" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle hover:btn-primary">❮</a>
              <a href="#slide3" className="btn btn-circle hover:btn-primary">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
          <Image src='https://i.ytimg.com/vi/1c_0KE0D6ag/hqdefault.jpg' alt="Banner3" className="max-w-[2080px]"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle hover:btn-primary">❮</a>
              <a href="#slide4" className="btn btn-circle hover:btn-primary">❯</a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
          <Image src={Banner4} alt="Banner4" className="max-w-[2080px]"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle hover:btn-primary">❮</a>
              <a href="#slide1" className="btn btn-circle hover:btn-primary">❯</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
