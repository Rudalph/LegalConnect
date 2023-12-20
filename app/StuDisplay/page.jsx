"use client";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/Components/firebase";
import Link from "next/link";

export default function Page({ searchParams }) {
  
const [lawyersData, setLawyersData]=useState([]);
useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Set the fetched data to the state
        setLawyersData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      {lawyersData
        
        .map((lawyer) => (
          <div key={lawyer.id} className="p-10 flex items-center justify-center">
            <div className="card lg:card-side bg-base-100 border border-accent w-[70%]">
              <figure>
                <img
                  src={lawyer.imgUrl}
                  alt="Lawyer Photo"
                  className="w-32 h-32 object-cover rounded-full m-8"
                />
              </figure>
              <div className="card-body">
                
                  <h2 className="card-title">{lawyer.name}</h2>
               
                {/* main content */}
                <div>
                  <p>
                    <strong>Year: </strong> {lawyer.yearOfStudy}
                  </p>

                  <div className="grid grid-cols-2 ">
                    <div>
                      <p>{lawyer.instituteName}</p>
                      <p>
                        <strong>Fee Structure / hr:</strong> {lawyer.fees}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Location:</strong> {lawyer.location}
                      </p>
                      
                    </div>

                    

                    <p>
                      <strong>Language:</strong> {lawyer.language}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="mr-4 text-2xl">
                      <a href={lawyer.linkedin}>
                        <FaLinkedin />
                      </a>
                    </p>
                    <p className="mr-4 text-2xl">
                      <a href={`tel:${lawyer.phone}`}>
                        <IoCall />
                      </a>
                    </p>
                    <p className="text-2xl">
                      <a href={`mailto:${lawyer.email}`}>
                        <IoMail />
                      </a>
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
