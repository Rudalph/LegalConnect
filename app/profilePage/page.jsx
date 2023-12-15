"use client";
import React, { useEffect, useState } from 'react';
import { PiPhoneCallFill } from 'react-icons/pi';
import { GrInstagram } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { TbWorldWww } from 'react-icons/tb';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/Components/firebase';
import Modal2 from "./Modal2";
import QRCode from "qrcode.react";
import  Link  from 'next/link';




export default function Page({ searchParams }) {
  const [lawyersData, setLawyersData] = useState([]);
  const [showModal2, setShowModal2] = useState(false);
 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, searchParams.collectionName));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setLawyersData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    if (searchParams.collectionName) {
      fetchData();
    }


  }, [searchParams.collectionName]);



  return (
    <div className='py-10 px-48'>
      {lawyersData
      .filter((lawyer) => lawyer.verificationStatus === 'verified')
      .map((lawyer) => {
        return(
      
       <div onClick={()=>setShowModal2(false)} key={lawyer.id} className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner my-3 flex justify-around gap-5 items-start'>
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
          </div>
          
        </div>

        )
})}
     
    </div>
  );
}
