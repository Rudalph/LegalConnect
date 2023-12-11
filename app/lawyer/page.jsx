"use client";
import React,{useState, useEffect, useId} from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/Components/firebase';
import { PiPhoneCallFill } from 'react-icons/pi';
import { GrInstagram } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { TbWorldWww } from 'react-icons/tb';
import QRCode from "qrcode.react";




const page = ({ searchParams }) => {
  const [lawyer, setLawyer] = useState([]);
  const [uid, setUid] = useState('');
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const docRef = doc(db, String(searchParams.category), String(searchParams.docid));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setLawyer([docSnap.data()]);
          setUid(String((docSnap.data().userID)));
          
        } else {
          // docSnap.data() will be undefined in this case
          alert("No such document!");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert("Error");
      }
    };
   
    if (searchParams.category) {
      fetchData();
    }


  }, [searchParams.category, searchParams.docid]);
 

  return (
    <div>
        {lawyer.map((law)=>{
          return(
            <div className='flex justify-around'>
                 <div className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner my-3  gap-5 h-fit w-96'>
                        <div className='flex justify-center'>
                           <img src={law.imgUrl} alt="" className="rounded-full w-[150px] h-[150px]" />
                        </div>
                        <div className='text-center'>
                            <h2 className='font-bold text-2xl'>{law.name}</h2>
                            <div className='p-5'>
                              <p className='p-3'>{law.description}</p>
                              <p className='p-3'>Designation: {law.designation} ({law.category})</p>
                              <p className='p-3'>Education: {law.education}</p>
                            </div>
                            <div className='flex justify-center'>
                              <p className='p-3'>Cased Won: {law.won}</p>
                              <p className='p-3'>Cases Handled: {law.handled}</p>
                            </div>
                            <div className='flex justify-center'>
                              <p className='p-3'>Location: {law.location}</p>
                              <p className='p-3'>Availability: {law.availability}</p>
                            </div>
                            <div className='p-5'>
                              <p className='p-3'>Experirnce: {law.years}</p>
                            </div>
                            <div className='flex justify-center'>
                            <h6 className='text-3xl p-2'><a href={law.linkedin}><BsLinkedin/></a></h6>
                            <h6 className='text-3xl p-2'><a href={`tel:${law.phone}`}><PiPhoneCallFill/></a></h6>
                            <h6 className='text-3xl p-2'><a href={law.instagram}><GrInstagram/></a></h6>
                            <h6 className='text-3xl p-2'><a href={`mailto:${law.email}`}><AiOutlineMail/></a></h6>
                            <h6 className='text-3xl p-2'><a href={`mailto:${law.website}`}><TbWorldWww/></a></h6>
                            </div>
                            <div className="flex justify-center items-center h-full">
                            <div className='p-5'>
                              <QRCode value={`upi://pay?pa=${law.upiId}`} />
                            </div>
                          </div>
                        </div>
                </div>
             
                <div className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner my-3 flex justify-around gap-5 items-start h-96 w-96'>
                <div>
                    <div>
                      {messages.map((message) => (
                        <div key={message.id}>
                          {message.text}
                        </div>
                      ))}
                    </div>
                    
                  </div>
                </div>
            </div>
          )
        })}
    </div>
  )
}

export default page;