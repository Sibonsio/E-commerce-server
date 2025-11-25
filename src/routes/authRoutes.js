import { Router } from "express";
const router = Router();
import { registerUser, loginUser, logoutUser } from "../controllers/authControllers.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;