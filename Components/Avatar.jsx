import React from 'react'

const Avatar = () => {
  return (
    <>
        <div className='flex flex-col justify-center items-center    py-4 bg-[#007C7C]'>
        
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                    <div className="w-12">
                    <img src="https://media.istockphoto.com/id/627676934/photo/confidence-and-style.jpg?s=612x612&w=0&k=20&c=lMuaeMOM0Jw-vCLEMmE9aBoujnINNB5ajmUEXtq8XIw=" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-12">
                    <img src="https://www.shutterstock.com/image-photo/handsome-hispanic-man-wearing-suit-260nw-2312294275.jpg" />
                    </div>
                </div>
                <div className="avatar">
                    <div className="w-12">
                    <img src="https://img.freepik.com/free-photo/handsome-young-businessman-suit_273609-6513.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1702425600&semt=ais" />
                    </div>
                </div>
                <div className="avatar placeholder">
                    <div className="w-12 bg-neutral text-neutral-content">
                    <span>+9999</span>
                    </div>
                </div>
            </div>
            <div className="text-white font-semibold mt-2">
                10000+ Legal Profressionals
            </div>
        </div>
    </>
  )
}

export default Avatar