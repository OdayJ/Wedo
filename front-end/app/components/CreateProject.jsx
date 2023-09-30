"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function () {
  const { data: session } = useSession();
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !date) {
      setError("All fields are required");
      return;
    }
    try {
      const { email } = session.user;
      const getUserResponse = await fetch(
        `http://localhost:3001/api/getUser?email=${email}`
      );
      if (!getUserResponse.ok) {
        throw new Error("Failed to fetch user");
      }
      const user = await getUserResponse.json();

      const projectData = {
        name: name,
        createdBy: user._id,
        date: date,
      };
      const createProjectResponse = await fetch(
        "http://localhost:3001/api/createProject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );
      if (!createProjectResponse.ok) {
        throw new Error("Failed to create project");
      }
      if (createProjectResponse.ok) {
        setName("");
        setDate("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FAFAFA] w-[270px] h-[344px] xl:h-[325px] rounded-lg flex flex-col font-poppins px-10 py-4 gap-6 "
    >
      <div>
        <p className="font-semibold text-xl">New Project?</p>
        <p className="opacity-50 text-sm w-full">Create a new project here!</p>
      </div>

      <div className="w-full flex flex-col gap-1 ">
        {error && (
          <p className="self-start text-xs text-[#d24c42] mb-1">{error}</p>
        )}
        <p className="font-medium text-sm">Project name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-xs h-7 border border-[#e6e6e6] rounded-md pl-1 outline-none"
          placeholder="Your project name here..."
        ></input>
      </div>
      <div className="w-full flex flex-col gap-1  ">
        <p className="font-medium text-sm">Due date</p>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full text-xs h-7 border border-[#e6e6e6] rounded-md pl-1 outline-none"
          placeholder="DD/MM/YY"
        ></input>
      </div>

      <button className="bg-primary text-white font-semibold text-s h-9 rounded-md ">
        Create Project
      </button>
    </form>
  );
}
