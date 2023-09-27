"use client";
import React, { useState } from "react";
import AssignTo from "./AssignTo";

export default function NewTask() {
  const [clicked, setClicked] = useState([]);
  const [task, setTask] = useState("");

  const handleAssignClick = (name) => {
    setClicked((prevClicked) => {
      if (prevClicked.includes(name)) {
        return prevClicked.filter((item) => item !== name);
      } else {
        return [...prevClicked, name];
      }
    });
  };
  const handleSubmit = () => {
    // Handling the submit, probably create a task depends on who the user is via session.user and thrn
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
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
