"use client"

import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, updateDoc, doc } from 'firebase/firestore'; // Adjust the import paths as per your Firebase setup
import { db } from '@/Components/firebase'; // Assuming 'db' is your Firebase database instance
import Link from 'next/link';
import { PiPhoneCallFill } from 'react-icons/pi';
import { GrInstagram } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { TbWorldWww } from 'react-icons/tb';

// Your functional component
export default function LawyersComponent() {
  const [lawyersData, setLawyersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionNames = ['civil', 'criminal']; 
        const promises = collectionNames.map(async (collectionName) => {
          const querySnapshot = await getDocs(collection(db, collectionName));
          return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });

        const results = await Promise.all(promises);
        const combinedData = results.flat(); // Merge arrays of data into one array

        setLawyersData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const accecptLawyer = (collectionName, documentId) => {
     alert("Accecpt Lawyer");
     alert(documentId);
     alert(collectionName);
    const fieldNameToAdd = 'verificationStatus'; 
    const fieldValueToAdd = 'verified'; 

    const addFieldToDocument = async (collectionName, documentId, field, value) => {
        try {
          const docRef = doc(db, collectionName, documentId);
          await updateDoc(docRef, {
            [field]: value // Adding field and value to the document
          });
          console.log(`Field '${field}' with value '${value}' added successfully to document '${documentId}' in '${collectionName}' collection`);
        alert("Verify kara dunga");
        } catch (error) {
          console.error('Error adding field and value:', error);
        }
      };

      addFieldToDocument(collectionName, documentId, fieldNameToAdd, fieldValueToAdd);

  }

  const deleteLawyer = (collectionName, documentId) => {
    alert("Delete Lawyer");
    alert(documentId);
     alert(collectionName); 
     
     const deleteDocument = async (collectionName, documentId) => {
        try {
          const docRef = doc(db, collectionName, documentId);
          await deleteDoc(docRef);
          console.log(`Document with ID ${documentId} deleted successfully from ${collectionName}`);
        alert("Backchodi Mat Kar Lawde tere puda document uda dunga");
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      };

      deleteDocument(collectionName, documentId);
 }

  return (
    <div className='py-10 px-48'>
      {lawyersData
      .filter((lawyer) => lawyer.verificationStatus != 'verified')
      .map((lawyer) => {
        return( 
      
       <div  className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner my-3 flex justify-around gap-5 items-start'>
          <div className='ml-10 mt-4'>
             <img src={lawyer.imgUrl} alt="" className="rounded-full w-[150px] h-[150px]" />
          </div>
          <div>
              <Link href={{pathname:"/lawyer", query:{category:lawyer.category, docid:lawyer.id}}}><h2 className='font-bold text-2xl'>{lawyer.name}</h2></Link>
            <br />
            <div>{lawyer.description}</div>
            <br />
            <div className='flex justify-between'>
              <h6>Fee Structure: {lawyer.fees}</h6>
            </div>
            <br />
            <div className='flex justify-between w-80'>
              <h6 className='text-3xl'><a href={lawyer.linkedin}><BsLinkedin/></a></h6>
              <h6 className='text-3xl'><a href={`tel:${lawyer.phone}`}><PiPhoneCallFill/></a></h6>
              <h6 className='text-3xl'><a href={lawyer.instagram}><GrInstagram/></a></h6>
              <h6 className='text-3xl'><a href={`mailto:${lawyer.email}`}><AiOutlineMail/></a></h6>
              <h6 className='text-3xl'><a href={`mailto:${lawyer.website}`}><TbWorldWww/></a></h6>
            </div>
          </div>
          <div>
            <h5 className='font-bold text-xl w-80 flex justify-start items-center'>{lawyer.designation}</h5>
            <br />
            <div className='flex justify-between'>
              <h6>Location: {lawyer.location}</h6>
              <h6>Years of experience: {lawyer.years}</h6>
            </div>
            <br />
            <div className='flex justify-between'>
              <h6>Current: {lawyer.current}</h6>
              <h6>Handled: {lawyer.handled}</h6>
              <h6>Won: {lawyer.won}</h6>
            </div>
            <br />
            <div className='flex justify-between'>
              <h6>Language: {lawyer.language}</h6>
              <h6>Availability: {lawyer.availability}</h6>
            </div>
            <div className='flex justify-evenly'>
                <button className=" bg-base-100 border-accent btn w-full hover:bg-accent hover:text-white" onClick={()=>{accecptLawyer(lawyer.category,lawyer.id)}}>Accecpt</button>
                <button className=" bg-base-100 border-accent btn w-full hover:bg-accent hover:text-white" onClick={()=>{deleteLawyer(lawyer.category,lawyer.id)}}>Delete</button>
            </div>
          </div>
          
        </div>

        )
})}
     
    </div>
  );
}