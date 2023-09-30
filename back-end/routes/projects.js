import express from "express";
import { Project } from "../models/Projects.js";
import { User } from "../models/Users.js";
const router = express.Router();

{
  /**
   *** Create a project using the name, userid and date
   *** Retrieve all projects for a user using userid
   *** Retrieve a project by projectId
   *** Add user to a project using user email and projectId
   *** Remove user from project using user email and projectId
   *** Create a task using projectId, task text, user email, status and list of emails assigned to.
   */
}
router.post("/createProject", async (req, res) => {
  try {
    const { name, createdBy, date } = req.body;
    if (!name || !createdBy) {
      return res
        .status(400)
        .json({ message: "Both name and createdBy are required " });
    }
    const newProject = await Project.create({ name, date, users: [createdBy] });

    return res.json(newProject);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserProjects", async (req, res) => {
  try {
    // Get the user's ID from the query parameters (or from req.body, depending on your setup)
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const userProjects = await Project.find({ users: userId }).exec();

    return res.json(userProjects);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getProject", async (req, res) => {
  try {
    const projectId = req.query.projectId;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    const project = await Project.findOne({ _id: projectId });
    return res.json(project);
  } catch (error) {
    return res.status(500).json({ error: "internal Server Error" });
  }
});

router.post("/addUserToProject", async (req, res) => {
  try {
    const { userEmail, projectId } = req.body;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ error: "Project not found" });
    }

    if (!project.users.includes(user._id)) {
      project.users.push(user._id);
      await project.save();
    }
    return res
      .status(200)
      .json({ message: "User added to project successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/removeUserFromProject", async (req, res) => {
  try {
    const { userEmail, projectId } = req.body;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        $pull: { users: user._id },
      },
      { new: true }
    );
    if (!project) {
      return res.status(400).json({ error: "Project doesn't exist" });
    }
    return res.status(200).json({ message: "User has been removed" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/createTask", async (req, res) => {
  try {
    const { projectId, text, status, createdBy, assignedTo } = req.body;

    const user = await User.findOne({ email: createdBy });
    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ error: "Project doesn't exist" });
    }

    let assignedUIDs = [];
    for (let email of assignedTo) {
      const assignedUser = await User.findOne({ email: email });
      if (assignedUser) {
        assignedUIDs.push(assignedUser._id);
      }
    }

    const newTask = {
      text: text,
      status: status,
      createdBy: user._id,
      assignedTo: assignedUIDs,
    };

    project.tasks.push(newTask);
    await project.save();

    return res.status(200).json(project);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.put("/completeTask", async (req, res) => {
  try {
    const { projectId, taskId } = req.body;

    // Find the project
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(400).json({ error: "Project doesn't exist" });
    }

    // Find the task within the project
    const task = project.tasks.id(taskId);
    if (!task) {
      return res.status(400).json({ error: "Task doesn't exist" });
    }

    // Update the task status
    if (task.status === "pending") {
      task.status = "complete";
      await project.save();
      return res
        .status(200)
        .json({ message: "Task status updated to complete" });
    } else {
      return res.status(400).json({ error: "Task is already complete" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

export { router as projectRouter };
