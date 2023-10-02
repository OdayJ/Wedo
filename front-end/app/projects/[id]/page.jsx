import NewTask from "@/app/components/NewTask";
import Task from "@/app/components/Task";
import React from "react";
import Nav from "@/app/components/Nav";
import PinProject from "@/app/components/PinProject";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function page({ params }) {
  const data = await getServerSession(authOptions);

  const project = await fetchProject(params);
  const user = await fetchUser(data);

  return (
    <>
      <Nav />
      <div className="w-full h-full pl-96 pt-24 font-poppins">
        <div className=" flex justify-between items-center w-[844px] mb-8 ">
          <div className="flex gap-2">
            <div className="text-2xl font-semibold">{project.name}</div>
            {project.date && (
              <div className="opacity-50  text-[14px] self-end">
                Due {project?.date}
              </div>
            )}
          </div>
          <PinProject projectId={params.id} user={user} />
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
    { cache: "no-store" },
    { next: { revalidate: 0 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }
  const data = await res.json();

  return data;
};

const fetchUser = async (e) => {
  const res = await fetch(
    `http://localhost:3001/api/getUser?email=${e.user.email}`,
    {
      cache: "no-store",
    },
    { next: { revalidate: 0 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }
  const result = await res.json();

  return result;
};
