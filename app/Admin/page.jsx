"use client";

import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore"; // Adjust the import paths as per your Firebase setup
import { db } from "@/Components/firebase"; // Assuming 'db' is your Firebase database instance
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

import { IoCall } from "react-icons/io5";

// Your functional component
export default function LawyersComponent() {
  const [lawyersData, setLawyersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionNames = ['civil', 'Criminal', 'Corporate', 'Family', 'Labor', 'Tax', 'Injury', 'Public', 'Estate', 'Medical'];
        const promises = collectionNames.map(async (collectionName) => {
          const querySnapshot = await getDocs(collection(db, collectionName));
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });

        const results = await Promise.all(promises);
        const combinedData = results.flat(); // Merge arrays of data into one array

        setLawyersData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const accecptLawyer = (collectionName, documentId) => {
    alert("Accecpt Lawyer");
    alert(documentId);
    alert(collectionName);
    const fieldNameToAdd = "verificationStatus";
    const fieldValueToAdd = "verified";

    const addFieldToDocument = async (
      collectionName,
      documentId,
      field,
      value
    ) => {
      try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
          [field]: value, // Adding field and value to the document
        });
        console.log(
          `Field '${field}' with value '${value}' added successfully to document '${documentId}' in '${collectionName}' collection`
        );
        alert("Verify kara dunga");
      } catch (error) {
        console.error("Error adding field and value:", error);
      }
    };

    addFieldToDocument(
      collectionName,
      documentId,
      fieldNameToAdd,
      fieldValueToAdd
    );
  };

  const deleteLawyer = (collectionName, documentId) => {
    alert("Delete Lawyer");
    alert(documentId);
    alert(collectionName);

    const deleteDocument = async (collectionName, documentId) => {
      try {
        const docRef = doc(db, collectionName, documentId);
        await deleteDoc(docRef);
        console.log(
          `Document with ID ${documentId} deleted successfully from ${collectionName}`
        );
        alert("Backchodi Mat Kar Lawde tere puda document uda dunga");
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    };

    deleteDocument(collectionName, documentId);
  };

  return (
    <div className="py-10 px-48">
      {lawyersData
        .filter((lawyer) => lawyer.verificationStatus != "verified")
        .map((lawyer) => {
          return (
            <div>
              <div className="p-10 flex items-center justify-center">
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
                      
                      <div className="flex space-x-4">
                        <button
                          className="btn btn-primary  "
                          onClick={() => {
                            accecptLawyer(lawyer.category, lawyer.id);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            deleteLawyer(lawyer.category, lawyer.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
