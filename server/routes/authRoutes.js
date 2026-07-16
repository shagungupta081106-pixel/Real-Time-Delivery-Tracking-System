import express from "express";
import { registerUser, loginUser, getAllUsers, } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, authorize("admin"), getAllUsers);

export default router;

