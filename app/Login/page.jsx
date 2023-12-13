"use client"
import React, {useState} from 'react'
import  Link  from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


 
const page = () => {

  const [loginValues, setLoginValues] = useState({
    email:'',
    password:''
  })

  const handleLogin = () => {
   if(loginValues.email==='' || loginValues.password==='')
   {
     alert("Kindly fill all fields to Login.")
   }
   else
   {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginValues.email, loginValues.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        alert("Logged in");
    
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Errors", errorMessage, errorCode);
      });
   }
  }

  return (
    <div>
       <form >
      {/* Email */}
      <div className="form-control">
        <label className="label">Email</label>
        <input
          onChange={(e)=>setLoginValues((prev)=>({...prev, email:e.target.value}))}
          required
          type="email"
          className="input input-bordered"
        />
      </div>
      {/* Password */}
      <div className="form-control">
        <label className="label">Password</label>
        <input
          required
          onChange={(e)=>setLoginValues((prev)=>({...prev, password:e.target.value}))}
          type="password"
          className="input input-bordered"
        />
      </div>

      <div className="mt-5 form-control">
      <Link href={"/Login"}><button className="btn-primary btn" onClick={handleLogin}>Login</button></Link>
      </div>
    </form>
    </div>

    // <div className='flex justify-center mt-14'>

    //  <div className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-2xl my-3 flex justify-around gap-5 items-start h-100 w-96'>
    //     <div className='justify-center'>
    //          <img src={'https://images.squarespace-cdn.com/content/v1/6011d0258691bf2a234c2a14/1666226941531-XRW5GPFIZ602LH026XEH/2022-04-13_CITESDoc_2-OfficerCitesForm_CL.gif?format=1000w'} alt="" className=" w-[270px] h-[170px]" />
    //          <br />
    //          <br />
    //          <input type="text" placeholder="Type your email id here" className="input input-bordered w-full max-w-xs border-solid " onChange={(e)=>setLoginValues((prev)=>({...prev, email:e.target.value}))} />
    //          <br />
    //          <br />
    //          <input type="text" placeholder="Enter your password here" className="input input-bordered w-full max-w-xs" onChange={(e)=>setLoginValues((prev)=>({...prev, password:e.target.value}))}/>
    //          <br />
    //          <br />
    //          <div className='flex justify-center'>
    //           <Link href={"/"}><button className='flex justify-center items-center bg-[#272829] rounded-lg text-[#FFF6E0] h-7 w-24 place-self-end' onClick={handleLogin} >LOGIN</button></Link>
    //          </div>
    //         <br />
    //         <br />
    //         <div className='flex justify-center'>
    //         <p>OR<Link href={'/Signup'} className='text-sky-500'> SIGNUP </Link> USING</p>
    //         </div>
    //         <div className='flex justify-center'>
    //          <br />
    //          <br />
    //          <button className="btn btn-circle btn-outline border-solid "><FcGoogle className="h-7 w-7"/></button>
    //         </div>
    //     </div>
       
        
             
    //  </div>

    // </div>
  )
}

export default page