"use client";
import React, { useEffect, useState } from "react";
import AssignTo from "./AssignTo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createTodo } from "@/app/actions";

// async function addTask(projectId, task, session, refresh) {
//   const data = {
// projectId: projectId,
// text: task,
// status: "pending",
// createdBy: session?.user?.email,
// assignedTo: [""],
//   };
//   await fetch("http://localhost:3001/api/createTask", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   refresh();
// }
const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className=" w-24 h-9 text-white bg-primary rounded-md"
    >
      Add Task
    </button>
  );
}

export default function NewTask({ projectId }) {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [task, setTask] = useState("");
  const [state, formAction] = useFormState(createTodo, initialState);

  return (
    <form
      action={formAction}
      onSubmit={() => setTask("")}
      // onSubmit={(e) => addTask(projectId, task, session, router.refresh)}
      className="w-[844px] h-24 flex border border-[#e6e6e6] rounded-lg p-4 justify-between"
    >
      <input type="hidden" name="projectId" value={projectId} />
      {email && <input type="hidden" name="user" value={email} />}

      <div className="flex flex-col justify-between w-full">
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task here..."
          className=" w-full placeholder-neutral placeholder-opacity-50 outline-none"
        />
        <div className="flex gap-4 items-center text-center ">
          <p className="opacity-50 text-sm text-neutral">Assign to : </p>
        </div>
      </div>
      <div className="grid place-items-end">
        <SubmitButton />
      </div>
    </form>
  );
}
