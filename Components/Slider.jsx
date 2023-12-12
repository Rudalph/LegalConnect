import React from "react";
import Image from "next/image";
import Slider1 from '@/public/images/icons/Ministry_of_Law_and_Justice.png'
import Slider2 from '@/public/images/icons/g20.png'
import Slider3 from '@/public/images/icons/amrit_mohatsav.png'
import Slider4 from '@/public/images/icons/data-gov.png'
import Slider5 from '@/public/images/icons/india-gov.png'
import Slider6 from '@/public/images/icons/Make_In_India.png'
import Slider7 from '@/public/images/icons/digital_india.png'
import Slider8 from '@/public/images/icons/mygov.png'





export default function Slider() {
  return (
    <div>
      <div className="carousel rounded-box max-h-28 max-w-full p-2 ">
        
        <div className="carousel-item">
            <Image src={Slider1} alt="Slider1" className="max-w-sm mx-10"/>
        </div>
        <div className="carousel-item">
            <Image src={Slider2} alt="Slider2" className="max-w-sm mx-10"/>
        </div>
        <div className="carousel-item">
            <Image src={Slider3} alt="Slider3" className="max-w-sm mx-10"/>
        </div>
        <div className="carousel-item">
            <Image src={Slider4} alt="Slider4" className="max-w-sm mx-10"/>
        </div>
        <div className="carousel-item items-center">
            <Image src={Slider5} alt="Slider5" className="max-w-sm mx-10"/>
        </div>
        <div className="carousel-item">
            <Image src={Slider6} alt="Slider6" className="max-w-sm mx-10"/>
        </div>
        <div className="carousel-item">
            <Image src={Slider7} alt="Slider7" className="max-w-sm mx-10"/>
        </div>
        <div className="carousel-item">
            <Image src={Slider8} alt="Slider8" className="max-w-sm mx-10"/>
        </div>

      </div>
      
    </div>
  );
}