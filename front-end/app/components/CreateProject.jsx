"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createProject } from "../actions";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className=" bg-primary text-white font-semibold text-s h-9 rounded-md"
    >
      Create Project
    </button>
  );
}

export default function () {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState("");
  const [error, setError] = React.useState("");
  const [state, formAction] = useFormState(createProject, initialState);

  const handleSubmit = () => {
    setName("");
    setDate("");
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="bg-[#FAFAFA] w-[270px] h-[344px] xl:h-[325px] rounded-lg flex flex-col font-poppins px-10 py-4 gap-6 "
    >
      {email && <input type="hidden" name="user" value={email} />}
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
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="w-full text-xs h-7 border border-[#e6e6e6] rounded-md pl-1 outline-none"
          placeholder="Your project name here..."
        ></input>
      </div>
      <div className="w-full flex flex-col gap-1  ">
        <p className="font-medium text-sm">Due date</p>
        <input
          value={date}
          name="date"
          onChange={(e) => setDate(e.target.value)}
          className="w-full text-xs h-7 border border-[#e6e6e6] rounded-md pl-1 outline-none"
          placeholder="DD/MM/YY"
        ></input>
      </div>

      <SubmitButton />
    </form>
  );
}
