const express = require("express");
const HabitController = require("../controllers/habit.controllers");
const UserController = require("../controllers/user.controllers");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.get("/users/", UserController.getAllUsers);

router.use(checkAuth);

// Habit routes
router.get("/habits/", HabitController.getAllHabits);
router.get("/habits/:id", HabitController.getHabitById);
router.post("/habits/", HabitController.createHabit);
router.put("/habits/:id", HabitController.updateHabit);
router.delete("/habits/:id", HabitController.deleteHabit);
router.get("/habits/count", HabitController.getHabitCount);

// User routes
router.get("/users/:id", UserController.getUserById);
router.post("/users/", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.get("/users/count", UserController.getUserCount);

module.exports = router;