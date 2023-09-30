import React from "react";

import Image from "next/image";

import NavProjects from "./NavProjects";

export default async function Nav() {
  return (
    <div className="flex flex-col fixed w-full pointer-events-none">
      <div className="w-full h-12 px-12 py-2 bg-primary flex justify-between select-none pointer-events-auto">
        <p className="text-white  text-2xl font-semibold ">Wedo</p>

        <div className="rounded-full w-9 h-9 relative ">
          <Image width={45} alt="user-image" src="/Mike.png" height={45} />
        </div>
      </div>
      <NavProjects />
    </div>
  );
}
