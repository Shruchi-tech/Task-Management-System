const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validateTask = require("../middleware/validateTask");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskStats,
    getTodayTasks,
    getOverdueTasks,
    markComplete
} = require("../controllers/taskController");

// Create Task
router.post("/", authMiddleware, validateTask,createTask);

// Get All Tasks
router.get("/", authMiddleware, getTasks);

// Update Task
router.put("/:id", authMiddleware, updateTask);

// Delete Task
router.delete("/:id", authMiddleware, deleteTask);
//get task stats
router.get("/stats",authMiddleware,getTaskStats);
//get today task
router.get("/today",authMiddleware,getTodayTasks);
//get overdue task
router.get("/overdue",authMiddleware,getOverdueTasks);
//mark task completed
router.put("/:id/complete",authMiddleware,markComplete);

module.exports = router;