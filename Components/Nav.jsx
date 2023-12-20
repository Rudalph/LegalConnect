"use client";
import React from "react";
import Logo from "@/public/images/LegalConnect.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { app } from "@/Components/firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Dropdown from "@/Components/Dropdown";

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
  const logOut = () => {
    if (isLoggedIn) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          setIsLoggedIn(false); // Update state after successful sign-out
          alert("Signout Successful");
        })
        .catch((error) => {
          console.error("Sign-out error", error);
        });
    } else {
      alert("You are not logged in");
    }
  };

  return (
    <div>
      <div className="navbar bg-[#017E7E] ">
        <div className="flex flex-1 flex-row">
          <a className="flex flex-row" href="https://lawmin.gov.in/">
            <img className="w-8 mx-1" src="https://i.ibb.co/9VPG7LN/Legal-connect-2.png" alt="LegalConnect Logo"
            />
            <div className="text-xl flex items-center font-bold text-white">
              Legal Connect <span className="text-xs px-1 pb-2 text-gray-300">Pro</span>
            </div>
          </a>
        </div>
        <div className="flex-none ">
          <ul className="px-1 py-0 flex items-center  justify-center space-x-6">
            <li className=" text-sm font-semibold text-white cursor-pointer hover:text-[#E9BA0B]">
              <Link href="/">Home</Link>
            </li>
            <li className="text-sm font-semibold text-white cursor-pointer hover:text-[#E9BA0B] ">
              <Link href="/Lawer_Register">Lawyer Registration</Link>
            </li>
            <li className="text-sm font-semibold text-white cursor-pointer hover:text-[#E9BA0B] ">
              <Link href="/StudentRegi">Law Student Registration</Link>
            </li>
            <li className="text-sm font-semibold text-white cursor-pointer hover:text-[#E9BA0B] ">
              <Link href="/StuDisplay">Find Student Assistance</Link>
            </li>
            <Dropdown className="bg-white hover:bg-white text-white"/>
            
            <li className={` ${isLoggedIn?"":"hidden"} `}>
              {isLoggedIn ? (
                <button className="font-semibold text-sm bg-white text-white hover:text-[#E9BA0B]" onClick={displayDetails}>User Details</button>
              ) : (
                <></>
              )}
            </li>

            {/* <li className="btn btn-ghost hover:bg-primary hover:text-white border border-primary">
              <Link href="/Signup">Register</Link>
            </li> */}
            <li className="bg-white rounded-lg px-4 py-2 font-semibold text-sm">
              <Link href="/Login">Login</Link>
            </li>
            <li>
              <button
                className="text-sm rounded-lg px-4 py-2 bg-[#04C4C4] text-white hover:text-black"
                onClick={logOut}
              >
                Logout
              </button>
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
