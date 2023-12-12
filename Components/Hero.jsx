import React from "react";
import Image from "next/image";
import Banner1 from '@/public/images/banner1.jpg';
import Banner2 from '@/public/images/banner2.jpg';
import Banner3 from '@/public/images/banner3.jpg';
import Banner4 from '@/public/images/banner4.jpg';

export default function Hero() {
  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <Image src={Banner1} alt="Banner1" className="w-full"/>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle hover:btn-primary">❮</a>
            <a href="#slide2" className="btn btn-circle hover:btn-primary">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
        <Image src={Banner2} alt="Banner2" className="w-full"/>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle hover:btn-primary">❮</a>
            <a href="#slide3" className="btn btn-circle hover:btn-primary">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
        <Image src={Banner3} alt="Banner3" className="w-full"/>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle hover:btn-primary">❮</a>
            <a href="#slide4" className="btn btn-circle hover:btn-primary">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
        <Image src={Banner4} alt="Banner4" className="w-full"/>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle hover:btn-primary">❮</a>
            <a href="#slide1" className="btn btn-circle hover:btn-primary">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
}
