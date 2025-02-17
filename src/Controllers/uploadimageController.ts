//Express
import express, { Request, Response } from 'express';

//Messages
import { Messages } from '../Constants/Messages';

//multer
import multer from 'multer';

//Path
import path from 'path';

//fs
import fs  from 'fs';

const app = express();

app.use(express.json()); 

//Upload file storage

const storage=multer.diskStorage({
    destination:(
        req:Express.Request,
        file:Express.Multer.File,
        cb:(error:Error|null,destination:string)=>void
    ) => {
        cb(null, path.join(__dirname, '../../upload'));
    },
        filename:(
            req:Express.Request,
            file:Express.Multer.File,
            cb:(error:Error|null,filename:string)=>void
         ) => {
                cb(null,`${Date.now()}-${file.originalname}`);
            },
    
});

export const upload = multer({ storage });


//Upload image api
export const uploadFile = async (req: Request, res: Response) :Promise<void>=> {
    try {
      if (!req.file) {
       res.status(400).json({ message:Messages.NoFileFound});
       return;
      }
  
      res.status(200).json({
        message: Messages.FileUpload,
        timestamp: new Date().toISOString(),
        fileDetails: {
          File:req.file,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };

  //get api by id
  export const getFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(__dirname, '../../upload', filename);
  
      if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
        return;
      } else {
        res.status(404).json({ message: Messages.FileNotFound });
        return;
      }
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message :Messages.ServerError });
      return;
    }
  }
 
// get all file api
export const getallFiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const uploadDir = path.join(__dirname, '../../upload');
    const files = fs.readdirSync(uploadDir); 

    if (files.length > 0) {
      const fileDetails = files.map(file => ({
        filename: file,
        url: `${req.protocol}://${req.get('host')}/files/${file}`, 
      }));

      res.status(200).json({
        message: 'Files found',
        files: fileDetails,
      });
    } else {
      res.status(404).json({ message:Messages.NoFileFound});
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : Messages.ServerError });
  }
};



  // Delete image api


export const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename } = req.params;
    
    const uploadDir = path.join(__dirname, '../../upload');
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      
      res.status(200).json({
        message: `File ${filename} deleted successfully.`,
      });
    } else {
      // If the file does not exist, return a 404 error
      res.status(404).json({ message: `File ${filename} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : Messages.ServerError });
  }
};


// Patch api

export const updateFile = [
  upload.single('image'), 
  async (req: Request, res: Response): Promise<void> => {
    try {
      
      const { filename } = req.params;  
      const uploadedFile = req.file;    
      
      if (!uploadedFile) {
       res.status(400).json({ message: 'No file uploaded' });
       return;
      }

      const uploadDir = path.join(__dirname, '../../upload');
      const oldFilePath = path.join(uploadDir, filename);
      const newFilePath = path.join(uploadDir, uploadedFile.originalname);

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      } else {
        res.status(404).json({ message: `File ${filename} not found` });
        return;
      }

      fs.renameSync(uploadedFile.path, newFilePath);

      res.status(200).json({
        message: `File ${filename} has been successfully updated.`,
        filename: uploadedFile.originalname, 
      });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Server error' });
    }
  },
];