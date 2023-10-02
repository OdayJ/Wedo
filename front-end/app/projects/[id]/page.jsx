import NewTask from "@/app/components/NewTask";
import Task from "@/app/components/Task";
import React from "react";
import Nav from "@/app/components/Nav";

export default async function page({ params }) {
  const project = await fetchProject(params);

  return (
    <>
      <Nav />
      <div className="w-full h-full pl-96 pt-24 font-poppins">
        <div className=" flex gap-2 mb-8 ">
          <div className="text-2xl font-semibold">{project.name}</div>
          {project.date && (
            <div className="opacity-50  text-[14px] self-end">
              Due {project?.date}
            </div>
          )}
        </div>
        <p className=" text-xl font-semibold mb-4">Tasks</p>
        <div className="flex flex-col gap-3 mb-4">
          {project.tasks
            .filter((task) => task.status === "pending")
            .map((task) => (
              <Task
                key={task._id}
                text={task.text}
                projectId={params.id}
                taskId={task._id}
              />
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
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }
  const data = await res.json();

  return data;
};
