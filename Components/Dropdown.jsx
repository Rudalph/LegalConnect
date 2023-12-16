import React from 'react';
import Link from 'next/link';

export default function Dropdown() {
  const lawyerCategories = ['Civil', 'Criminal', 'Corporate', 'Family', 'Labor', 'Tax', 'Injury', 'Public', 'Estate', 'Medical'];

  return (
    <div>
      <li className="pr-7">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn bg-base-100">
            Find Experts
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
