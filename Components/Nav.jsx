"use client";
import React from "react";
import Logo from "@/public/images/Ministry_of_Law_and_Justice.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import app from "@/Components/firebase";
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
      <div className="navbar ">
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
              <Link href="/Lawer_Register">Lawyer Registration</Link>
            </li>
            <Dropdown/>
            
            <li className="pr-7 btn btn-ghost hover:bg-primary hover:text-white border border-primary">
              {isLoggedIn ? (
                <button onClick={displayDetails}>User Details</button>
              ) : (
                <></>
              )}
            </li>

            {/* <li className="btn btn-ghost hover:bg-primary hover:text-white border border-primary">
              <Link href="/Signup">Register</Link>
            </li> */}
            <li className="btn btn-ghost hover:bg-primary hover:text-white border border-primary">
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