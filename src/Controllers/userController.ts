//Express
import express, { Request, Response } from 'express';

//UserModel
import User from '../Model/userModel';

//JwtWebToken
import  jwt  from 'jsonwebtoken';

//Messages
import { Messages } from '../Constants/Messages';

const JWTSECRET="your_jwt_secret_key";

const app = express();

app.use(express.json()); 

// Login API
export const signInUser = async (req: Request, res: Response) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(401).json({ error: Messages.InvalidEmail });
      return;
    }
    
    // const isMatch = await bcrypt.compare(password, user.password)/;
    if (user && password === user.password) {
      const token=jwt.sign({id:user._id,email:user.email},JWTSECRET,{
        expiresIn:'50s'
      });
      res.status(200).json({ message:Messages.LoginSuccess,token });
      return;
     
    }else{
       res.status(401).json({ error: Messages.InvalidEmail });
       return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }
};
// Create User 
export const createUser = async (req: Request, res: Response) => {
    try {
    const { name, email,contact, password } = req.body;
    const user = new User({
      name,
      email,
      contact,
      password,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
    return;
  }
};

// Get All Users 
export const getAllUsers = async (req: Request, res: Response) => {
    try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    if(error instanceof Error)
    res.status(400).json({ error: error.message });
    return;
  }
};

// Get User by ID 
export const getSingleUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const singleUser = await User.findById(id);
      if (singleUser) {
        res.status(200).json(singleUser);
        return;
      } else {
        res.status(404).json(Messages.UserNotFound);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      } else {
        res.status(500).json({ error: Messages.UnknownError });
        return;
      }
    }
  };


// Update User 
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const updateUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(updateUser);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };


// Delete User 
export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
      const singleUser = await User.findByIdAndDelete(id);
      if (!singleUser) {
        res.status(404).json({ error:Messages.UserNotFound });
      }
      res.status(200).json(singleUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };

