"use client";
import React from "react";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { updateTaskStatus } from "../actions";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label={pending}
      className="bg-white w-6 h-6 rounded-full pointer-events-auto"
    ></button>
  );
}
export default function Task({ text, taskId, projectId }) {
  const [state, formAction] = useFormState(updateTaskStatus, initialState);
  return (
    <form
      action={formAction}
      className=" w-[844px] h-11 bg-[#F2EDFF] flex pl-8  justify-between font-poppins items-center  rounded-lg text-neutral"
    >
      <div className="flex gap-8">
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="taskId" value={taskId} />
        <SubmitButton />
        <div className="">{text}</div>
      </div>
    </form>
  );
}
