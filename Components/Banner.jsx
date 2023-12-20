import React from 'react'

const Banner = () => {
  return (
    <>
        <div className='container flex flex-row px-10 py-10'>

          <div className="content w-[60%]">
              <div className="text-4xl font-bold text-[#002C3E] mt-8">
                Legal Connect Professionals
              </div>
              <div className="description text-lg text-gray-400 my-4 w-[65%]">
                Legal Expertise, Directly to You: Connect, Consult, Resolve. 10000+ legal professionals on board.
              </div>
              <div className="flex flex-row my-6 space-x-6">
                  <button className='bg-[#FD5428] text-white text-sm font-semibold px-4 py-2 rounded-lg'>Find Lawyers</button>
                  <button className='border border-[#FD5428] text-[#FD5428] text-sm font-semibold bg-white px-4 py-2 rounded-lg'>Register as Professional</button>

              </div>
          </div>
          <div className="image px-10">
            <div className=''>
              <img className='w-[300px]' src="https://i.ibb.co/KG5qnyF/Legal-Connect-Survey-Analysis-7.png" alt="" />
            </div>

          </div>
        </div>
    </>
  )
}

export default Banner