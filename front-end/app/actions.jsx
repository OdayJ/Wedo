"use server";
import { revalidatePath } from "next/cache";
export async function createTodo(prevState, formData) {
  const data = {
    projectId: formData.get("projectId"),
    text: formData.get("task"),
    status: "pending",
    createdBy: formData.get("user"),
    assignedTo: [""],
  };
  try {
    if (!data.text) return;
    await fetch("http://localhost:3001/api/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidatePath(`/projects/${data.projectId}`);
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function createProject(prevState, formData) {
  try {
    const getUserResponse = await fetch(
      `http://localhost:3001/api/getUser?email=${formData.get("user")}`
    );
    if (!getUserResponse.ok) {
      throw new Error("Failed to fetch user");
    }
    const user = await getUserResponse.json();

    const projectData = {
      name: formData.get("name"),
      createdBy: user._id,
      date: formData.get("date"),
    };

    if (!projectData.name || !projectData.date) return;
    const createProjectResponse = await fetch(
      "http://localhost:3001/api/createProject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );
    revalidatePath(`/feed`);
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function updateTaskStatus(prevState, formData) {
  const data = {
    projectId: formData.get("projectId"),
    taskId: formData.get("taskId"),
  };

  if (!data.projectId || !data.taskId) return { message: "Missing data" };

  try {
    await fetch("http://localhost:3001/api/updateTaskStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidatePath(`/projects/${data.projectId}`);
    return { message: `Updated task ${data.taskId}` };
  } catch (e) {
    return { message: "Failed to update task status" };
  }
}
