"use client";
import React from "react";
import Logo from "@/public/images/LegalConnect.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import {app} from "@/Components/firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Dropdown from "@/Components/Dropdown"

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        setUserName(user.email);
        setUserID(user.uid);
      } else {
        setIsLoggedIn(false); // User is not logged in
        setUserName("");
        setUserID("");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const displayDetails = () => {
    setShowAlert(true);
  };

  return (
    <div>
      <div className="navbar bg-[#017E7E] ">
        <div className="flex flex-1 flex-row">
          <a className="flex flex-row" href="https://lawmin.gov.in/">
            <Image src={Logo} alt="Logo" className="w-8 mr-1" width={175} height={200} />
            <div className="text-xl flex items-center font-bold text-[#344B66]">Legal Connect</div>
          </a>
        </div>
        <div className="flex-none ">
          <ul className="px-1 py-0 flex items-center bg-white hover:bg-white justify-center space-x-7">
            <li className="hover:bg-white text-sm font-semibold text-gray-400 cursor-pointer hover:text-[#344B66]">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:bg-white text-sm font-semibold text-gray-400 cursor-pointer hover:text-[#344B66]">
              <Link href="/Lawer_Register">Lawyer Registration</Link>
            </li>
            <Dropdown className="bg-white hover:bg-white"/>
            
            <li className={` ${isLoggedIn?"":"hidden"} `}>
              {isLoggedIn ? (
                <button className="font-semibold text-sm text-gray-400 hover:text-black" onClick={displayDetails}>User Details</button>
              ) : (
                <></>
              )}
            </li>

            {/* <li className="btn btn-ghost hover:bg-primary hover:text-white border border-primary">
              <Link href="/Signup">Register</Link>
            </li> */}
            <li className="">
              <Link href="/Login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
            
      {showAlert && (
        <div
          role="alert"
          className="fixed top-5 left-1/2 transform -translate-x-1/2 alert bg-base-100 w-fit border-accent"
        >
          <div>
            <h3 className="font-bold">Your User Details!</h3>
            <div className="text-xs ">
              You are logged in as <p className="font-bold">{userName}</p> with
              User ID <p className="font-bold ">{userID}</p>
            </div>
          </div>
          <button
            className="btn btn-sm bg-accent text-white hover:text-black"
            onClick={() => setShowAlert(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
