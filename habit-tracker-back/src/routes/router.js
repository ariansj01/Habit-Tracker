const express = require("express");
const HabitController = require("../controllers/habit.controllers");
const UserController = require("../controllers/user.controllers");
const AuthController = require("../services/login.service");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();


router.post('/login', AuthController.login);
router.post("/users/", UserController.createUser);
router.get("/users/", UserController.getAllUsers);
router.get("/habits/", HabitController.getAllHabits);

router.use(checkAuth);

// Habit routes
router.get("/habits/:id", HabitController.getHabitById);
router.post("/habits/", HabitController.createHabit);
router.put("/habits/:id", HabitController.updateHabit);
router.patch("/habits/:id/archive", HabitController.updateHabit);
router.post("/habits/:id/complete", HabitController.completeHabit);
router.get("/habits/:id/streak", HabitController.getHabitStreak);
router.get("/habits/streaks", HabitController.getAllStreaks);
router.delete("/habits/:id", HabitController.deleteHabit);
router.get("/habits/count", HabitController.getHabitCount);

// User routes
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.get("/users/count", UserController.getUserCount);

module.exports = router;