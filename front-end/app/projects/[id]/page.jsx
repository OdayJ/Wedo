import NewTask from "@/app/components/NewTask";
import Task from "@/app/components/Task";
import React from "react";
import Nav from "@/app/components/Nav";

export default async function page({ params }) {
  const project = await fetchProject(params);
  console.log(project.tasks);

  return (
    <>
      <Nav />
      <div className="w-full h-full pl-96 pt-24 font-poppins">
        <div className=" flex gap-2 mb-8 ">
          <div className="text-2xl font-semibold">{project.name}</div>
          <div className="opacity-50  text-[14px] self-end">Due some date</div>
        </div>
        <p className=" text-xl font-semibold mb-4">Tasks</p>
        <div className="flex flex-col gap-3 mb-4">
          {project.tasks.map((task) => (
            <Task key={task._id} text={task.text} />
          ))}
        </div>
        <NewTask projectId={params.id} />
      </div>
    </>
  );
}

const fetchProject = async (params) => {
  const projectId = params.id;
  const res = await fetch(
    `http://localhost:3001/api/getProject?projectId=${projectId}`,
    { next: { cache: "no-store", revalidate: 0 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }
  const data = await res.json();

  return data;
};
