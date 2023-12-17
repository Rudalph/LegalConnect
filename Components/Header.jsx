import React from "react";
import Image from "next/image";


export default function Header() {
  return (
    <footer className="footer p-3 bg-base-100 text-base-content ">
      <a
        className="footer-left hover:bg-base-200 p-2 rounded-lg"
        target="_blank"
        href="https://www.india.gov.in/"
        title="भारत सरकार"
        role="link"
      >
        <div className="ministry-logo">
          <Image />
        </div>
        <div className="">
          भारत सरकार | Government of India
        </div>
      </a>
      <ul className="menu menu-vertical sm:menu-horizontal bg-base-200 rounded-box place-self-end p-1" >
        <li>
          <a>A-</a>
        </li>
        <li>
          <a>A</a>
        </li>
        <li>
          <a>A</a>
        </li>
      </ul>
    </footer>
  );
}
