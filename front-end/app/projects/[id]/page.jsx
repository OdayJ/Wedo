import NewTask from "@/app/components/NewTask";
import Task from "@/app/components/Task";
import React from "react";

export default function page({ params }) {
  return (
    <div className="w-full h-full pl-96 pt-24 font-poppins">
      <div className=" flex gap-2 mb-8 ">
        <div className="text-2xl font-semibold">
          {params.id.replace("-", " ")}
        </div>
        <div className="opacity-50  text-[14px] self-end">Due some date</div>
      </div>
      <p className=" text-xl font-semibold mb-4">Tasks</p>
      <div className="flex flex-col gap-3 mb-4">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
      <NewTask />
    </div>
  );
}
