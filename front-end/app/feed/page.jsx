import React from "react";

import CreateProject from "../components/CreateProject";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Nav from "../components/Nav";

export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Nav />
      <div className="w-full h-full pl-[280px] pt-14">
        <button className="bg-yellow-500">Click me</button>
        <div>{session?.user?.email}</div>
        <CreateProject />
      </div>
    </>
  );
}
