//Express
import express from "express";

//UserController
import {
  createUser,
  signInUser,
  getAllUsers,
  getSingleUsers,
  deleteUser,
  updateUser,
} from "../Controllers/userController"; 

//Authentication
import verifytoken from "../Middleware/authantication";
import { forgotPassword, resetPassword } from "../Controllers/passwordController";

const router = express.Router();

router.post("/adduser", createUser);
router.post("/signin", signInUser);
router.get("/allusers", getAllUsers);
router.get("/getsingleuser/:id", getSingleUsers);
router.delete("/deleteuser/:id", deleteUser);
router.patch("/updateuser/:id", updateUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
export default router;

