"use client";
import React from "react";
import { useState } from "react";
import { storage } from "@/Components/firebase";
import { app,db } from "@/Components/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function Page() {
  const [data, setData] = useState({
    name: "",
    designation: "",
    description: "",
    category: "",
    advocateID:"",
    location: "",
    years: 0,
    handled: "",
    won: "",
    contact: "",
    language: "",
    upiId:"",
    email:"",
    fees: 0,
    education: "",
    ratingNumber:0
  });
  const [img, setImg] = useState("");
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(storage, `${data.category}/${data.contact}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        setImg(val);
      });
    });
  };
  const handleSubmit = async () => {
    try {
      alert("Working");
      const docRef = await addDoc(collection(db, `${data.category}`), {
        name: data.name,
        designation: data.designation,
        description: data.description,
        category: data.category,
        advocateID: data.advocateID,
        location: data.location,
        years: data.years,
        handled: data.handled,
        won: data.won,
        contact: data.contact,
        language: data.language,
        fees: data.fees,
        education: data.education,
        email: data.email,
        upiId: data.upiId,
        imgUrl: img,
        ratingNumber:0,
      });
      alert("Document written with ID: " + docRef.id);
    } catch (error) {
      alert("Error adding document: " + error);
    }
  };

  return (

               
        <div className="flex justify-center items-center mt-20 mb-20">
          <div className="card bg-base-100 p-6 w-full max-w-screen-lg md:w-4/5 lg:w-3/4 xl:w-2/3 ">
            <h2 className="text-2xl font-bold">Lawyers Registration</h2>
            <hr className="my-4 border-t-2 border-base-200 p-2 shadow-2xl rounded-2xl" />
            <form className="grid grid-cols-2 gap-6 md:grid-cols-2 ">
               <div> 
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  onChange={(event)=>setData((prev) => ({...prev, name: event.target.value}))} value={data.name}
                  required
                  type="text"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Designation</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, designation: event.target.value}))} value={data.designation}
                />
              </div>
              <div className="form-control">
                <label className="label">Description</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, description: event.target.value}))} value={data.description}
                />
              </div>
              <div className="form-control">
                <label className="label">Category</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, category: event.target.value}))} value={data.category}
                />
              </div>
              <div className="form-control">
                <label className="label">Advocate ID</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, advocateID: event.target.value}))} value={data.advocateID}
                />
              </div>
              <div className="form-control">
                <label className="label">Location</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, location: event.target.value}))} value={data.location}                />
              </div>
              
              <div className="form-control">
                <label className="label">Years of Experience</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, years: event.target.value}))} value={data.years}                />
              </div>

              <div className="form-control">
                <label className="label">Cases Handled</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, handled: event.target.value}))} value={data.handled}/>
              </div>

              
              </div>
              <div>
              <div className="form-control">
                <label className="label">Cases Won</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, won: event.target.value}))} value={data.won}/>
              </div>

              <div className="form-control">
                <label className="label">Contact</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, contact: event.target.value}))} value={data.contact}/>
              </div>

              <div className="form-control">
                <label className="label">Language</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, language: event.target.value}))} value={data.language}/>
              </div>

              
              <div className="form-control">
                <label className="label">Education</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, education: event.target.value}))} value={data.education}/>
              </div>

              <div className="form-control">
                <label className="label">Fees</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, fees: event.target.value}))} value={data.fees}/>
              </div>

              
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  required
                  type="email"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, email: event.target.value}))} value={data.email}/>
              </div>

              <div className="form-control">
                <label className="label">UPI id</label>
                <input
                  required
                  type="text"
                  className="input input-bordered"
                  onChange={(event)=>setData((prev) => ({...prev, upiId: event.target.value}))} value={data.upiId}/>
              </div>

              <div className="mt-7 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                <div className="text-center">
                  <div className="flex text-xs leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input type="file" className="sr-only" onChange={(e)=>handleUpload(e)}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              </div>

              <div className="col-span-2 mt-6 form-control w-full flex justify-center items-center" >
                
                  <button className="bg-base-100 border-primary btn w-full hover:bg-primary hover:text-white" onClick={handleSubmit}>
                    Submit
                  </button>
                
              </div>
          
            </form>
          </div>
        </div>

        
   
  );
}
