import React from 'react'

const Banner = () => {
  return (
    <>
        <div className='container flex flex-row px-10 py-10'>

          <div className="content w-[60%]">
              <div className="text-4xl font-semibold text-[#002C3E] mt-8">
                Legal Connect Professionals
              </div>
              <div className="description text-lg text-gray-400 my-4 w-[60%]">
                Legal Expertise, Directly to You: Connect, Consult, Resolve. 
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