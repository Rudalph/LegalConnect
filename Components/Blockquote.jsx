import React from "react";
import Hero from "/public/images/Pmmodi.png";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

export default function Blockquote() {
  return (
    <div>
      <div className="hero min-h-min bg-base-100 p-10">
        <div className="hero-content flex-col md:flex-row-reverse start-0">
          <div className="flex flex-col items-left justify-center md:w-6/12">
         
            <FaQuoteLeft className="text-5xl mb-2 text-primary text-justify" />
            <h3 className="text-xl font-bold mb-4 p-4">
              Internet-based technologies can help in the procedural management of courts and will benefit the Justice Delivery System to a large extent. The government is also working towards connecting every court to the eCourts System.
            </h3>
            <div className="flex flex-col items-end">
              <p className="text-base mr-10">
                ~ Shri Narendra Modi
              </p>
              <button className="btn btn-primary p-4 mt-6 mr-10">Get Started</button>
            </div>
          </div>
          <div className="md:w-6/12 pr-12">
            <Image
              src={Hero}
              alt="Hero"
              className="max-sm rounded-lg bg-base-100 shadow-2xl w-full md:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
