import React from "react";
import Image from "next/image";
import Logo from "@/public/images/Ministry_of_Law_and_Justice.png";

export default function Header() {
  return (
    <footer className="footer py-2 px-4 bg-base-100 text-base-content ">
      <a
        className="footer-left  p-2 rounded-lg flex flex-row"
        target="_blank"
        href="https://www.india.gov.in/"
        title="भारत सरकार"
        role="link"
      >
        <div className="ministry-logo border border-y-0 border-l-0 border-r-1">
          <Image className="w-32 pr-4" src={Logo} alt="Ministry of Law and Justice"/>
        </div>
        <div className="flex items-center justify-center pt-2">
          भारत सरकार | Government of India
        </div>
      </a>
      <ul className="rounded-lg cursor-pointer  sm:menu-horizontal bg-white border border-gray-200 text-[#3F8DFD] place-self-end p-1" >
        <li className="font-semibold rounded-lg px-2 py-1 border bg-white border-y-0 border-l-0 border-r-1 ">
          <a>A-</a>
        </li >
        <li className="font-semibold rounded-lg px-2 py-1 border bg-white border-y-0 border-l-0 border-r-1">
          <a>A</a>
        </li>
        <li className="font-semibold rounded-lg bg-white px-2 py-1 ">
          <a>A+</a>
        </li>
      </ul>
    </footer>
  );
}
