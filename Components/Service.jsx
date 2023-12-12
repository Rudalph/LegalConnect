'use client'
import React from "react";

export default function Service() {
  return (
    <div>
      <div className="items-center justify-center p-10 ml-10">
        <h1 className="text-4xl font-bold">Our Services</h1>
      </div>  
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Document Generation</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Try Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
