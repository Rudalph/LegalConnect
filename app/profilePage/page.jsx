"use client";
import React, { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "@/Components/firebase";
import Link from "next/link";

export default function Page({ searchParams }) {
  const [lawyersData, setLawyersData] = useState([]);
  const [showModal2, setShowModal2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, searchParams.collectionName)
        );
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sorting based on fees, experience, and rating
        const sortedData = data.sort((a, b) => {
          // Sorting based on fees (highest first)
          if (a.fees !== b.fees) {
            return b.fees - a.fees;
          }
          // If fees are equal, sort based on experience (lowest first)
          if (a.years !== b.years) {
            return a.years - b.years;
          }
          // If fees and experience are equal, sort based on rating (highest first)
          return b.ratingNumber - a.ratingNumber;
        });

        setLawyersData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchParams.collectionName) {
      fetchData();
    }
  }, [searchParams.collectionName]);

  return (
    <div>
      {lawyersData
        .filter((lawyer) => lawyer.verificationStatus === "verified")
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
                <Link
                  href={{
                    pathname: "/lawyer",
                    query: { category: lawyer.category, docid: lawyer.id },
                  }}
                >
                  <h2 className="card-title">{lawyer.name}</h2>
                </Link>
                {/* main content */}
                <div>
                  <p>
                    <strong>Designation</strong> {lawyer.designation}
                  </p>

                  <div className="grid grid-cols-2 ">
                    <div>
                      <p>{lawyer.description}</p>
                      <p>
                        <strong>Fee Structure / hr:</strong> {lawyer.fees}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Location:</strong> {lawyer.location}
                      </p>
                      <p>
                        <strong>Years of experience:</strong> {lawyer.years}
                      </p>
                    </div>

                    <div>
                      <p>
                        <strong>Handled:</strong> {lawyer.handled}
                      </p>
                      <p>
                        <strong>Won:</strong> {lawyer.won}
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
                  <Link
                    href={{
                      pathname: "/lawyer",
                      query: { category: lawyer.category, docid: lawyer.id },
                    }}
                  >
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Know more!</button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
