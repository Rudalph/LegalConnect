import React from "react";
import Logo from "@/public/images/Ministry_of_Law_and_Justice.png";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="https://lawmin.gov.in/">
            <Image src={Logo} alt="Logo" width={175} height={200} />
          </a>
        </div>
        <div className="flex-none ">
          <ul className="menu menu-horizontal px-1  flex items-center justify-center space-x-4">
            <li className="pr-7">
              <Link href="/">Home</Link>
            </li>
            <li className="pr-7">
              <a>Find</a>
            </li>
            <li className="pr-7">
              <a>Profile</a>
            </li>
            <li className="btn btn-ghost hover:bg-primary hover:text-white border border-primary">
              <Link href="/Signup">Register</Link>
            </li>
            <li className="btn btn-ghost hover:bg-primary hover:text-white border border-primary">
              <Link href="/Login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
