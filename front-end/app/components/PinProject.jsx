"use client";
import React from "react";
import { BsPinAngleFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { pinProject, unPinProject } from "../actions";

const initialState = {
  message: null,
};

function PinButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-label={pending}>
      <BsPinAngleFill size={24} fill="white" strokeWidth={1} stroke="#000000" />
    </button>
  );
}
function UnpinButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-label={pending}>
      <BsPinAngleFill size={24} fill="#845EF7" />
    </button>
  );
}
export default function PinProject({ projectId, user }) {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [state, formAction] = useFormState(pinProject, initialState);
  const [state2, formAction2] = useFormState(unPinProject, initialState);
  return (
    <>
      {user.pinned.includes(projectId) && (
        <form action={formAction2}>
          <div className="flex gap-8">
            <input type="hidden" name="projectId" value={projectId} />
            <input type="hidden" name="email" value={email} />
            <UnpinButton />
          </div>
        </form>
      )}
      {!user.pinned.includes(projectId) && (
        <form action={formAction}>
          <div className="flex gap-8">
            <input type="hidden" name="projectId" value={projectId} />
            <input type="hidden" name="email" value={email} />
            <PinButton />
          </div>
        </form>
      )}
    </>
  );
}
