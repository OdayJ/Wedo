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
