import express from "express";
import { Project } from "../models/Projects.js";

const router = express.Router();

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
export { router as projectRouter };
