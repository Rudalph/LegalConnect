"use client";
import React, { useState, useEffect } from 'react'
import { FaUserTie } from "react-icons/fa";
import { TfiViewListAlt } from "react-icons/tfi";
import { RiLoginCircleFill } from "react-icons/ri";
import Modal from './Modal';
import Modal1 from './Modal1';
import {db} from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';
import { storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BiLogOut } from "react-icons/bi";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { TbListDetails } from "react-icons/tb";


const Navbar = () => {
 
  const [data, setData] = useState({
    name:'',
    designation:'',
    description:'',
    category:'',
    website:'',
    location:'',
    years:'',
    linkedin:'',
    current:'',
    handled:'',
    won:'',
    contact:'',
    language:'',
    availability:'',
    address:'',
    fees:'',
    education:'',
    achivenemts:'',
    memberships:'',
  })
  
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [img, setImg] = useState('');
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(storage, `${data.category}/${data.contact}`)
    uploadBytes(imgs, e.target.files[0]).then(data=>{
      console.log(data,"imgs");
      getDownloadURL(data.ref).then(val=>{
        console.log(val);
        setImg(val);
      })
    })
  }

  const handleSubmit = async () => {
    try {
      
      const docRef = await addDoc(collection(db, `${data.category}`), {
        name:data.name,
        designation:data.designation,
        description:data.description,
        category:data.category,
        website:data.website,
        location:data.location,
        years:data.years,
        linkedin:data.linkedin,
        current:data.current,
        handled:data.handled,
        won:data.won,
        contact:data.contact,
        language:data.language,
        availability:data.availability,
        userID:data.userID,
        fees:data.fees,
        education:data.education,
        email:data.email,
        upiId:data.upiId,
        imgUrl:img,
      });
      alert("Document written with ID: " + docRef.id);
      
    } catch (error) {
      alert("Error adding document: " + error);
    }
  };  

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        setUserName(user.email);
        setUserID(user.uid)
      } else {
        setIsLoggedIn(false); // User is not logged in
        setUserName('');
        setUserID('')
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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

  const displayDetails = () =>{
    alert(`You are Loggedin with: ${userName} and User id as ${userID}`);
  }
 

  return (
    <div>
        <nav className='bg-[#272829] text-white h-20 p-5 flex justify-between'>
            <div>
                <Link href={"/"}><p className='logo-text text-4xl text-[#FFF6E0]'>Legal Connect</p></Link>
            </div>
           <div className="grid grid-flow-col justify-stretch font-semibold">
                {isLoggedIn?(
                  <>
                    <div className='p-5'><button className='text-3xl text-[#FFF6E0]' onClick={displayDetails}><TbListDetails /></button></div>
                  </>
                
                ):(<></>)}
                <div className='p-5'><button className='text-3xl text-[#FFF6E0]' onClick={()=>setShowModal(true)}><FaUserTie/></button></div>
                <div className='p-5'><button href={"/"} className='text-3xl text-[#FFF6E0]' onClick={()=>setShowModal1(true)}><TfiViewListAlt /></button></div>
                <div className='p-5'><button href={"/"} className='text-3xl text-[#FFF6E0]'><Link href={"/Login"}><RiLoginCircleFill /></Link></button></div>
                <div className='p-5'><button href={"/"} className='text-3xl text-[#FFF6E0]' onClick={logOut}><BiLogOut /></button></div>
           </div>
        </nav> 
        
       <Modal isVisible={showModal} onClose={()=>setShowModal(false)} > 
        <div className='p-5'>
            <h1 className='flex justify-center items-center text-2xl heading'>
                LAWYER&apos;S REGISTRATION FORM
            </h1>
        </div>
        <form className="form">
            <div className='flex justify-around items-center p-10'>
                <input type="text" placeholder='Enter Your Name' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, name: event.target.value}))} value={data.name}/>
                <input type="text" placeholder='Designation' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, designation: event.target.value}))} value={data.designation}/>
                <input type="text" placeholder='Description' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, description: event.target.value}))} value={data.description}/>
                <input type="text" placeholder='Category' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, category: event.target.value}))} value={data.category}/>
            </div>
            <div className='flex justify-around items-center p-10'>
                <input type="text" placeholder='Website Link' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, website: event.target.value}))} value={data.website}/>
                <input type="text" placeholder='Location of Practice' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, location: event.target.value}))} value={data.location}/>
                <input type="text" placeholder='Years of Experience' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, years: event.target.value}))} value={data.years}/>
                <input type="text" placeholder='Linkedin' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, linkedin: event.target.value}))} value={data.linkedin}/>
            </div>
            <div className='flex justify-evenly items-center p-10'>
                <input type="text" placeholder='Current Cases' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, current: event.target.value}))} value={data.current}/>
                <input type="text" placeholder='Cases Handled' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, handled: event.target.value}))} value={data.handled}/>
                <input type="text" placeholder='Cases Won' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, won: event.target.value}))} value={data.won}/>
                <input type="text" placeholder='Contact' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, contact: event.target.value}))} value={data.contact}/>
            </div>
            <div className='flex justify-evenly items-center p-10'>
                <input type="text" placeholder='Language' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, language: event.target.value}))} value={data.language}/>
                <input type="text" placeholder='Availability' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, availability: event.target.value}))} value={data.availability}/>
                <input type="text" placeholder='User ID' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, userID: event.target.value}))} value={data.userID}/>
                <input type="text" placeholder='Fee Structure' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, fees: event.target.value}))} value={data.fees}/>
            </div>
            <div className='flex justify-evenly items-center p-10'>
                <input type="text" placeholder='Education' className='bg-[#D8D9DA] border-collapse w-80'onChange={(event)=>setData((prev) => ({...prev, education: event.target.value}))} value={data.education}/>
                <input type="text" placeholder='Email' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, email: event.target.value}))} value={data.email}/>
                <input type="text" placeholder='UPI ID' className='bg-[#D8D9DA] border-collapse w-80' onChange={(event)=>setData((prev) => ({...prev, upiId: event.target.value}))} value={data.upiId}/>
                <input type="file" onChange={(e)=>handleUpload(e)} />
            </div>
        </form> 
        <div className='flex flex-col'>
                <button className='flex justify-center items-center bg-[#272829] rounded-lg text-[#FFF6E0] h-7 w-20 place-self-end' onClick={handleSubmit}>submit</button>
         </div>
       </Modal>



       <Modal1 isVisible={showModal1} onClose={()=>setShowModal1(false)} > 
        <div className='p-5'>
            <h1 className='flex justify-center items-center text-2xl heading'>
                FIND EXPERT FOR YOURSELF
            </h1>
        </div>
        <div className='p-6 flex justify-evenly items-center'>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "Civil" } }}><button>Civil Layyers</button></Link>
          </div>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "criminal" } }}><button>Criminal Lawyer</button></Link>
          </div>
        </div>
        <div className='p-6 flex justify-evenly items-center'>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "corporate" } }}><button>Corporate Lawyers</button></Link>
          </div>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "family" } }}><button>Family Lawyer</button></Link>
          </div>
        </div>
        <div className='p-6 flex justify-evenly items-center'>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "labor" } }}><button>Labor Lawyers</button></Link>
          </div>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "tax" } }}><button>Tax Lawyer</button></Link>
          </div>
        </div>
        <div className='p-6 flex justify-evenly items-center'>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "injury" } }}><button>Personal Injury</button></Link>
          </div>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "public" } }}><button>Public Interest</button></Link>
          </div>
        </div>
        <div className='p-6 flex justify-evenly items-center'>
          <div className='w-40 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "estate" } }}><button>Real Estate</button></Link>
          </div>
          <div className='w-50 h-30 flex justify-center items-center rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner'>
            <Link isVisible={showModal1} onClick={() => setShowModal1(false)} href={{ pathname: "/profilePage", query: { collectionName: "medical" } }}><button>Medical Malpractice</button></Link>
          </div>
        </div>
       </Modal1 >
    </div>
  )
}

export default Navbar



