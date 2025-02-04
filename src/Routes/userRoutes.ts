// src/routes/userRoutes.ts
import express from "express";
import {
  createUser,
  signInUser,
  getAllUsers,
  getSingleUsers,
  deleteUser,
  updateUser,
  // updateUserById,
} from "../Controllers/userController"; // Adjust the import path as necessary
import verifytoken from "../Middleware/authantication";

const router = express.Router();

// Define the routes and associate them with controller functions
router.post("/adduser", createUser);
router.post("/signin", signInUser);
router.get("/allusers", verifytoken, getAllUsers);
router.get("/getsingleuser/:id", getSingleUsers);
router.delete("/deleteuser/:id", deleteUser);
router.patch("/updateuser/:id", updateUser);

export default router;

// // src/routes/userRoutes.ts
// import express from "express";
// import authenticateToken from "../Middleware/authantication"; // Adjust the import path as necessary
// import {
//   createUser,
//   signInUser,
//   logoutUser,
//   getAllUsers,
//   getUserById,
//   deleteUserById,
//   // updateUserById,
// } from "../Controllers/userController"; // Adjust the import path as necessary

// const router = express.Router();

// // Define the routes and associate them with controller functions
// router.post("/nm", createUser);
// router.post("/signin", signInUser);
// router.post("/logout", authenticateToken, logoutUser);
// router.get("/get", authenticateToken, getAllUsers);
// router.get("/get/:id", getUserById);
// router.delete("/delete/:id", deleteUserById);
// // router.patch("/update/:id", updateUserById);

// export default router;

// // import express, { Request, Response } from 'express';
// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import User from '../Model/userModel';
// // import  jwt  from 'jsonwebtoken';
// // import verifytoken from '../Middleware/authantication';
// // // import User from 'Model/userModel';
// // // import User from './Model/userModel'/;

// // dotenv.config();
// // const JWTSECRET="your_jwt_secret_key";
// // const app = express();
// // const PORT = process.env.PORT || 8000;
// // app.use(express.json()); // Middleware to parse JSON data

// // // MongoDB Connection
// // mongoose.connect(process.env.URI || 'mongodb://localhost:27017/mydatabase').then(() => {
// //   console.log('Connected to MongoDB');
// // }).catch((error) => {
// //   console.error('Failed to connect to MongoDB:', error);
// //   process.exit(1);
// // });
// // // Login API
// // app.post('/login', async (req: Request, res: Response): Promise<void>=> {
// //   try {
// //     const { email, password } = req.body;
// //     const user = await User.findOne({ email });
    
// //     if (!user) {
// //       res.status(401).json({ error: 'Invalid email or password' });
// //       return;
// //     }
    
// //     // const isMatch = await bcrypt.compare(password, user.password)/;
// //     if (user && password === user.password) {
// //       const token=jwt.sign({id:user._id,email:user.email},JWTSECRET,{
// //         expiresIn:'50s'
// //       });
// //       res.status(200).json({ message: 'Login successful',token });
     
// //     }else{
// //        res.status(401).json({ error: 'Invalid email or password' });
// //        return;
// //     }
// //   } catch (error) {
// //     if (error instanceof Error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   }
// // });
// // // Create User (C)
// // app.post('/adduser', async (req: Request, res: Response) => {
// //   try {
// //     const { name, email,contact, password } = req.body;
// //     const user = new User({
// //       name,
// //       email,
// //       contact,
// //       password, // In real applications, password should be hashed
// //     });

// //     const savedUser = await user.save();
// //     res.status(201).json(savedUser);
// //   } catch (error) {
// //     if(error instanceof Error)
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // // Get All Users (R)
// // app.get('/allusers',verifytoken, async (req: Request, res: Response) => {
// //   try {
// //     const users = await User.find();
// //     res.status(200).json(users);
// //   } catch (error) {
// //     if(error instanceof Error)
// //     res.status(400).json({ error: error.message });
// //   }
// // });

// // // // Get User by ID (R)
// // app.get('/:id',async (req: Request, res: Response): Promise<void> => {
// //     const { id } = req.params;
// //     try {
// //       const singleUser = await User.findById(id);
// //       if (singleUser) {
// //         res.status(200).json(singleUser);
// //       } else {
// //         res.status(404).json('Users not found');
// //       }
// //     } catch (error) {
// //       if (error instanceof Error) {
// //         res.status(500).json({ error: error.message });
// //       } else {
// //         res.status(500).json({ error: 'An unknown error occurred' });
// //       }
// //     }
// //   }
// // );


// // // // Update User (U)
// // // patch operation Api
// // app.patch('/:id',async (req: Request, res: Response): Promise<void> => {
// //     const { id } = req.params;
// //     try {
// //       const updateUser = await User.findByIdAndUpdate(id, req.body, {
// //         new: true,
// //       });

// //       res.status(200).json(updateUser);
// //     } catch (error) {
// //       console.log(error);
// //       if (error instanceof Error) {
// //         res.status(500).json({ error: error.message });
// //       }
// //     }
// //   }
// // );


// // // // Delete User (D)
// // app.delete('/:id',
// //   async (req: Request, res: Response): Promise<void> => {
// //     const { id } = req.params;
// //     try {
// //       const singleUser = await User.findByIdAndDelete(id);
// //       if (!singleUser) {
// //         res.status(404).json({ error: 'User not found' });
// //       }
// //       res.status(204).json();
// //     } catch (error) {
// //       if (error instanceof Error) {
// //         res.status(500).json({ error: error.message });
// //       }
// //     }
// //   }
// // );

// // export default app;
