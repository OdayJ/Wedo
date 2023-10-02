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
  const colors = [
    "#ff6b6b",
    "#f06595",
    "#cc5de8",
    "#5c7cfa",
    "#339af0",
    "#22b8cf",
    "#20c997",
    "#51cf66",
    "#fcc419",
    "#ff922b",
  ];
  const r = Math.floor(Math.random() * 10);
  const newColor = colors[r];
  try {
    const { name, createdBy, date } = req.body;
    if (!name || !createdBy) {
      return res
        .status(400)
        .json({ message: "Both name and createdBy are required " });
    }
    const newProject = await Project.create({
      name,
      date,
      users: [createdBy],
      color: newColor,
    });

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

router.get("/nearestProjects", async (req, res) => {
  try {
    // Assuming you are sending user's email or ID in the request query
    const userEmail = req.query.email;
    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    // Fetch the user based on the email or ID (you could also directly use the ID in the project query if you have it)
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentDate = new Date();
    const formattedDate =
      currentDate.getDate().toString().padStart(2, "0") +
      "/" +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      currentDate.getFullYear().toString().slice(-2);

    const projects = await Project.find({
      date: { $gte: formattedDate },
      users: user._id,
    });

    // Sort projects based on the date using JavaScript
    projects.sort((a, b) => {
      return (
        convertStringToDate(b.date).getTime() -
        convertStringToDate(a.date).getTime()
      );
    });

    return res.json(projects.slice(0, 3));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/updateTaskStatus", async (req, res) => {
  try {
    const { projectId, taskId } = req.body;

    if (!projectId || !taskId) {
      return res
        .status(400)
        .json({ error: "Both project ID and task ID are required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const task = project.tasks.id(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ error: "Task not found within the given project" });
    }

    task.status = "completed";
    await project.save();

    return res
      .status(200)
      .json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router };

export { router as projectRouter };

// Utils
const convertStringToDate = (str) => {
  const [day, month, year] = str.split("/");
  return new Date(`20${year}-${month}-${day}`);
};
