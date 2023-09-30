"use client";
import React, { useEffect, useState } from "react";
import AssignTo from "./AssignTo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function addTask(projectId, task, session, refresh) {
  const data = {
    projectId: projectId,
    text: task,
    status: "pending",
    createdBy: session?.user?.email,
    assignedTo: [""],
  };
  await fetch("http://localhost:3001/api/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  refresh();
}
export default function NewTask({ projectId }) {
  const { data: session } = useSession();
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => addTask(projectId, task, session, router.refresh)}
      className="w-[844px] h-24 flex border border-[#e6e6e6] rounded-lg p-4 justify-between"
    >
      <div className="flex flex-col justify-between w-full">
        <input
          type="text"
          placeholder="Enter your task here..."
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          className=" w-full placeholder-neutral placeholder-opacity-50 outline-none"
        />
        <div className="flex gap-4 items-center text-center ">
          <p className="opacity-50 text-sm text-neutral">Assign to : </p>
          <AssignTo onClick={() => handleAssignClick("Mom")}>Mom</AssignTo>
          <AssignTo onClick={() => handleAssignClick("Dad")}>Dad</AssignTo>
          <AssignTo onClick={() => handleAssignClick("Sister")}>
            Sister
          </AssignTo>
        </div>
      </div>
      <div className="grid place-items-end">
        <button
          type="submit"
          className=" w-24 h-9 text-white bg-primary rounded-md"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}
