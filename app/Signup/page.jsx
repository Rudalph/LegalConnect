"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import emailjs from 'emailjs-com';
import { FcGoogle } from "react-icons/fc";
import { FaSignInAlt } from "react-icons/fa";


const Page = () => {
  const auth = getAuth();

  const [signupValues, setSignupValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    otp:'',
    generatedOTP:''
  });
  
 const generateOTP = () =>{
  const newOTP=Math.floor(1000 + Math.random() * 9000);
  signupValues.generatedOTP=newOTP;
  return(newOTP);
 }

  const sendOTP = () =>{

      const generatedOTP = generateOTP();
      const recipientEmail = signupValues.email; 
      const subject = 'OTP for Signingup with Legal Connect';
      const message = generatedOTP;

      emailjs.send(
        'service_3n4u5xv', 
        'template_lxheujc', 
        { recipientEmail, subject, message },
        'KNZnsBBQD1OHUCvaf' 
      )
        .then((response) => {
          console.log('Email sent:', response);
          alert('Email sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          alert('Failed to send email.');
        });
  }

  const signUp = () => {
    if (signupValues.firstName === '' || signupValues.lastName === '' || signupValues.email === '' || signupValues.password === '' || signupValues.otp==='') {
      alert('Kindly fill all the details to signup');
    } 
    else {

      if(signupValues.otp==signupValues.generatedOTP)
      {
          createUserWithEmailAndPassword(auth, signupValues.email, signupValues.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            alert("Account Created");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
      }
      else
      {
        alert("Wrong credentials Entered");
        
      }

    }
  };

  

 

  return (

    <div className='flex justify-center'>

     <div className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-2xl my-3 flex justify-around gap-5 items-start h-100 w-96'>
        <div className='justify-center'>
             <img src={'https://images.squarespace-cdn.com/content/v1/5f0b5e8b8533dc0f880314a6/1599690746483-1Z5PSS9GCN334R6LAAQK/animation2.gif'} alt="" className=" w-[270px] h-[170px]" />
             <br />
             <input type="text" placeholder="Enter Your First Name" className="input input-bordered w-full max-w-xs border-solid " onChange={(event)=>setSignupValues((prev) => ({...prev, firstName: event.target.value}))}/>
             <br />
             <br />
             <input type="text" placeholder="Enter Your Last Name" className="input input-bordered w-full max-w-xs" onChange={(event)=>setSignupValues((prev) => ({...prev, lastName: event.target.value}))} />
             <br />
             <br />
             <input type="email" placeholder="Type your email id here" className="input input-bordered w-full max-w-xs border-solid " onChange={(event)=>setSignupValues((prev) => ({...prev, email: event.target.value}))}/>
             <br />
             <br />
             <input type="password" placeholder="Enter your password here" className="input input-bordered w-full max-w-xs" onChange={(event)=>setSignupValues((prev) => ({...prev, password: event.target.value}))}/>
             <br />
             <br />
             <div className='flex justify-around'>
              <input type="password" placeholder="Enter OTP here" className="input input-bordered w-full max-w-xs" onChange={(event)=>setSignupValues((prev) => ({...prev, otp: event.target.value}))}/>
              <button className='flex justify-center items-center bg-[#272829] rounded-lg text-[#FFF6E0] h-7 w-32 place-self-end' onClick={sendOTP}><p>OTP</p></button>
             </div>
             <br />
             <br />
             <div className='flex justify-center'>
              <button className='flex justify-center items-center bg-[#272829] rounded-lg text-[#FFF6E0] h-7 w-28 place-self-end' onClick={signUp}><FaSignInAlt /> <p className='pl-2'>SIGNUP</p></button>
             </div>
            <br />
            <br />
            <div className='flex justify-center'>
            <p>OR<Link href={'/Signup'} className='text-sky-500'> SIGNUP </Link> USING</p>
            </div>
            <div className='flex justify-center'>
             <br />
             <br />
             <button className="btn btn-circle btn-outline border-solid "><FcGoogle className="h-7 w-7"/></button>
            </div>
        </div>
       
        
             
     </div>

    </div>
  )
};

export default Page;
