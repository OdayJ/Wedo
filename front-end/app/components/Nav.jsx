"use client";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavOption from "./NavOption";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const currentPage = usePathname();
  if (currentPage == "/signup") return <></>;
  if (currentPage == "/signin") return <></>;
  if (currentPage == "/") return <></>;
  return (
    <div className="flex flex-col fixed w-full pointer-events-none">
      <div className="w-full h-12 px-12 py-2 bg-primary flex justify-between select-none pointer-events-auto">
        <p className="text-white  text-2xl font-semibold ">Wedo</p>

        <div className="rounded-full w-9 h-9 relative ">
          <Image width={45} alt="user-image" src="/Mike.png" height={45} />
        </div>
      </div>
      <div className="no-scrollbar bg-[#FAFAFA] h-screen w-[280px] flex flex-col gap-4 py-8 px-4 select-none overflow-auto pointer-events-auto">
        <NavOption icon={"🏠"} title="Feed" />
        <NavOption icon={"🏠"} title="Mike's birthday" />
        <NavOption icon={"🏠"} title="Mike's birthday" />
        <div className="rounded-md h-10 w-60 text-lg text-primary flex gap-4 items-center px-4 cursor-pointer select-none hover:bg-[#f2edff]">
          <div>
            <AiOutlinePlus fill="#845EF7" size={24} />
          </div>
          <div>New Project</div>
        </div>
      </div>
    </div>
  );
}
