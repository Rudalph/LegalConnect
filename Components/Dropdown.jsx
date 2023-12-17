import React from 'react';
import Link from 'next/link';
import { FaAngleDown } from "react-icons/fa";

export default function Dropdown() {
  const lawyerCategories = ['Civil', 'Criminal', 'Corporate', 'Family', 'Labor', 'Tax', 'Injury', 'Public', 'Estate', 'Medical'];

  return (
    <div className="group">
      <li className="pr-7">
        <div className="dropdown dropdown-bottom group-hover mx-auto">
          <div tabIndex={0} role="button" className="flex flex-row text-sm font-semibold text-gray-400 hover:text-[#344B66]">
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
                <Link href={{ pathname: '/profilePage', query: { collectionName: category } }}>
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
