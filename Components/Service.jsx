"use client";
import React from "react";
import cn from "classnames";
import { GoGoal } from "react-icons/go";
import { FaBoltLightning } from "react-icons/fa6";
import { TbBulbFilled } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import Image from 'next/image'

export default function Service() {
  const our_values = [
    {
      icon: GoGoal,
      title: "Accuracy",
      description:
        "Ensuring precise legal assistance by leveraging advanced technologies and expertise.",
    },
    {
      icon: FaBoltLightning,
      title: "Efficiency",
      description:
        "Streamlining document generation processes for quick and effective results.",
    },
    {
      icon: TbBulbFilled,
      title: "Innovation",
      description:
        "Continuously exploring innovative solutions to enhance legal workflows and services.",
    },
    {
      icon: MdOutlineSecurity,
      title: "Security",
      description:
        "Prioritizing the security and confidentiality of legal documents and information.",
    },
  ];

  const our_services = [
    {
      title: "Legal Digital Assistant",
      description:
        "Enhance legal processes with an AI-powered digital assistant.",
      rowSpan: 2,
      image:
        "https://img.freepik.com/free-vector/chat-bot-concept-illustration_114360-5522.jpg?w=740&t=st=1702467640~exp=1702468240~hmac=0ee5cada8eb59e2c8f2d58bf552a04ea60b41ac5b09aee7031a22b6a79c539d3",
      tags: ["AI Assistant", "Automation"],
    },
    {
      title: "Document Simplification",
      description: "Simplify complex legal documents for easy comprehension.",
      rowSpan: 3,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-credit-assessment-concept-with-documents_23-2149154259.jpg?w=740&t=st=1702467778~exp=1702468378~hmac=ee82f7a1e2d69a13bf7230de7e5fe75c0f888064b9ce7a50074f847d385eb254",
      tags: ["Document Simplification"],
    },
    {
      title: "Document Generation",
      description: "Efficiently generate and edit legally compliant documents.",
      image:
        "https://img.freepik.com/free-vector/file-transfer-concept-illustration_114360-580.jpg?w=740&t=st=1702467842~exp=1702468442~hmac=3c03b41414c5b39e7abba2cade1944c0dc13aa42d1964ef89988a42c095d630e",
      tags: ["Document Generation", "Automation"],
    },
    {
      title: "Legal Connect",
      description:
        "Facilitate seamless connections within the legal ecosystem.",
      rowSpan: 2,
      image:
        "https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1092.jpg?w=740&t=st=1702467939~exp=1702468539~hmac=2ca1e72deca9a811db8b0133b0c92394865ef124db1cc0ff9471fb1b7c96e08f",
      tags: ["Networking", "Collaboration"],
    },
    {
      title: "Privacy and Security",
      description:
        "Ensure robust privacy and security measures in legal processes.",
      image:
        "https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg?w=740&t=st=1702467983~exp=1702468583~hmac=98f4e61ff3c7d37647f8663dd85cee46626686eb3b2adb45481d8f5b356a968a",
      tags: ["Privacy", "Security"],
    },
    {
      title: "Maintenance & Support",
      description: "Ensure ongoing support for long-term software excellence.",
      image:
        "https://img.freepik.com/free-vector/computer-troubleshooting-concept-illustration_114360-7616.jpg?w=740&t=st=1702468083~exp=1702468683~hmac=b0d58ceaad57c478dc849849217028b0fdb29dcbf1e09376639ba5773a5d65e7",
      tags: ["Support", "Legal Tech"],
    },
  ];

  return (
    <div className="">
      {/* Our Services */}
      <div className="grid gap-1 mt-8 py-16">
      <div className="flex justify-center my-1">
          <p className="text-sm font-semibold text-[#04C4C4]">EXPLORE</p>
        </div>
        <h1 className="text-4xl mb-2 font-bold text-[#007C7C] tracking-tight text-center">
          Our Services
        </h1>
        <div className="flex justify-center">
          <p className="text-sm text-gray-400">
            Get Reliable Tools for Legal Documentation tasks
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  py-12">
            {our_services.map((e) => (
              <div
                key={e.title}
                className={cn(
                  "group relative gap-4 overflow-clip rounded-xl md:w-[350px] my-6 md:h-[470px] card bg-base-100 shadow-xl",
                  e.rowSpan && `row-span-${e.rowSpan}`
                )}
              >
                <div className="h-[230px]">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="card-body pb-8 px-5 pt-0">
                  <h2 className="card-title text-2xl font-semibold ">{e.title}</h2>
                  <p className="text-sm  text-gray-500">{e.description}</p>
                  <div className="card-actions justify-start py-2 ">
                    {e.tags.map((tag) => (
                      <div
                        key={tag}
                        className=" bg-[#EBF3FF] cursor-pointer rounded-lg text-[#3F8DFD] text-sm py-3 px-5 "
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Our values */}
      <div className="mx-auto grid max-w-7xl gap-1 py-2 mt-8 mb-14  pb-6">
        <div className="flex justify-center my-1">
          <p className="text-sm font-semibold text-[#2BB4FD]">UNDERSTAND</p>
        </div>
        <h1 className="text-4xl mb-2 font-bold text-[#344B66] tracking-tight text-center">
          Our Values
        </h1>
        <div className="flex justify-center mb-4">
          <p className="text-sm text-gray-400">Discover the Core Principles Guiding Our Legal Services</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8  py-12">
          {our_values.map((e) => (
            <div key={e.title} className="flex flex-col gap-4 text-center">
              <div className="h-fit w-fit rounded-lg bg-muted p-4 mx-auto">
                {<e.icon className="h-12 w-12 text-[#344B66] hover:text-[#2BB4FD]" />}
              </div>
              <div className="grid gap-3">
                <h4 className="text-2xl text-[#344B66] font-semibold">{e.title}</h4>
                <p className="font-light text-sm text-gray-500">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
