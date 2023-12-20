import React from "react";
import Image from "next/image";
import Banner1 from '@/public/images/banner1.jpg';
import Banner2 from '@/public/images/banner2.jpg';
import Banner3 from '@/public/images/banner3.jpg';
import Banner4 from '@/public/images/banner4.jpg';

export default function Hero() {
  return (
    <div className="mx-auto max-w-screen-xl bg-[#EDFFFF]">
      <div className="flex justify-center pt-10">
          <p className="text-sm font-semibold text-[#04C4C4]">FIND</p>
        </div>
        <h1 className="text-4xl mb-2 font-bold text-[#007C7C] tracking-tight text-center">
          Events to Watch Out
        </h1>
        <div className="flex justify-center">
          <p className="text-sm text-gray-400">
            Get updates of events related to Law & Justice
          </p>
        </div>
      <div className="flex justify-center">
        <div className="carousel w-[70%] md:h-[450px] lg:h-[500px] rounded-xl my-8 ">
          <div id="slide1" className="carousel-item relative w-full">
          <img className="w-full" src="https://pbs.twimg.com/media/EApOp36U0AAd5Jp?format=jpg&name=900x900" alt="Description"/>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle hover:btn-primary">❮</a>
              <a href="#slide2" className="btn btn-circle hover:btn-primary">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
          <img className="w-full" src="https://education.sakshi.com/sites/default/files/images/2023/09/07/scocountries-1694082483.jpg" alt="Banner2" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle hover:btn-primary">❮</a>
              <a href="#slide3" className="btn btn-circle hover:btn-primary">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
          <img src="https://images.moneycontrol.com/static-mcnews/2023/09/11-g20-summit-india-day-1.jpg?impolicy=website&width=1600&height=900" alt="Banner3" className="max-w-[2080px]"/>
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
