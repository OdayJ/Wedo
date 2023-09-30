import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavOption from "./NavOption";
import { AiOutlinePlus } from "react-icons/ai";
export default async function NavProjects() {
  const projects = await fetchProjects();
  return (
    <div className="no-scrollbar bg-[#FAFAFA] h-screen w-[280px] flex flex-col gap-4 py-8 px-4 select-none overflow-auto pointer-events-auto">
      {projects.map((project) => (
        <NavOption
          key={project._id}
          title={project.name}
          icon={"🏠"}
          id={project._id}
        />
      ))}
      <div className="rounded-md h-10 w-60 text-lg text-primary flex gap-4 items-center px-4 cursor-pointer select-none hover:bg-[#f2edff]">
        <div>
          <AiOutlinePlus fill="#845EF7" size={24} />
        </div>
        <div>New Project</div>
      </div>
    </div>
  );
}
const fetchProjects = async () => {
  const session = await getServerSession(authOptions);
  const { email } = session.user;
  const getUserResponse = await fetch(
    `http://localhost:3001/api/getUser?email=${email}`
  );
  if (!getUserResponse.ok) {
    throw new Error("Failed to fetch user");
  }
  const user = await getUserResponse.json();

  const response = await fetch(
    `http://localhost:3001/api/getUserProjects?userId=${user._id}`
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve projects");
  }
  const data = await response.json();
  return data;
};
