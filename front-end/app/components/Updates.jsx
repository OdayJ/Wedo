import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "next-auth";
export default async function Updates() {
  const nearestProjects = await fetchProjects();
  return (
    <div className="text-neutral font-poppins bg-[#F2EDFF] md:w-[905px] md:h-[231px] rounded-lg flex flex-col py-4 px-8 gap-8  items-center">
      <div className="font-semibold text-2xl">Project Updates</div>
      <div className="self-start flex w-full flex-col gap-4">
        {nearestProjects.map((project) => {
          const pendingTasksCount = project.tasks.filter(
            (task) => task.status === "pending"
          ).length;

          return (
            <div
              className="flex w-full justify-between items-center"
              key={project._id}
            >
              <div className="flex gap-4 items-center">
                <div
                  className="w-4 h-4 rounded-lg"
                  style={{ backgroundColor: project.color }}
                ></div>
                <p>
                  The Project{" "}
                  <span className="font-medium">{project.name}</span> has{" "}
                  <span className="font-medium">{pendingTasksCount}</span>{" "}
                  {pendingTasksCount == 1 ? "task " : "tasks "}
                  left to be done.
                </p>
              </div>
              <div className="opacity-60 text-sm">Due {project.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const fetchProjects = async () => {
  const session = await getServerSession(authOptions);
  const { email } = session.user;

  const response = await fetch(
    `http://localhost:3001/api/nearestProjects?email=${email}`,
    { next: { revalidate: 0 } }
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve projects");
  }
  const data = await response.json();
  return data;
};
