import { Router } from "express";
import { registerUser , loginUser , getMe , updateUser } from "../controllers/Users.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const UserRoutes = Router();

UserRoutes.post("/register", registerUser)
UserRoutes.post("/login", loginUser)
UserRoutes.get("/me", protectRoute, getMe )
UserRoutes.post('/update', protectRoute, updateUser)
export default UserRoutes;