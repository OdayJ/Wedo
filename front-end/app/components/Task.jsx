import React from "react";
import { BsThreeDots } from "react-icons/bs";
export default function Task() {
  return (
    <div className=" w-[844px] h-11 bg-[#F2EDFF] flex pl-8  justify-between font-poppins items-center  rounded-lg text-neutral">
      <div className="flex gap-8">
        <button className="bg-white w-6 h-6 rounded-full pointer-events-auto"></button>
        <div className="">Clean the laundry</div>
      </div>
      <div className="opacity-70 flex gap-4 items-center text-center pr-4">
        <div>Dad</div>
        <BsThreeDots size={32} className="cursor-pointer" />
      </div>
    </div>
  );
}
