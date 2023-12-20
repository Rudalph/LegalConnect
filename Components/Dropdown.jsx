import React from 'react';
import Link from 'next/link';
import { FaAngleDown } from "react-icons/fa";

export default function Dropdown() {
  const lawyerCategories = ['civil', 'criminal', 'corporate', 'family', 'labor', 'tax', 'injury', 'public', 'estate', 'medical'];

  return (
    <div className="group">
      <li className="pr-7">
        <div className="dropdown dropdown-bottom group-hover mx-auto">
          <div tabIndex={0} role="button" className="flex flex-row text-sm text-white font-semibold  hover:text-[#E9BA0B]">
            <div className="mr-1">
              Find Experts
            </div>
            <div className="pt-1">
              <FaAngleDown />  
            </div>                 
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 rounded-box sm:w-48 md:w-64 lg:w-96 bg-base-200"
          >
            {lawyerCategories.map((category) => (
              <li key={category}>
                <Link href={{ pathname: '/profilePage', query: { collectionName: category.toLowerCase() } }}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </div>
  );
}
