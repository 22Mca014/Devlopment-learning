// Importing necessary modules
import express from "express";   // Imports Express, a web framework for Node.js, for handling HTTP requests and routing.
import multer from "multer";     // Imports Multer, a middleware for handling file uploads in Node.js.
import cors from "cors";         // Imports CORS, a middleware to allow cross-origin resource sharing.
import fs from "fs";             // Imports fs (file system) module to work with files and directories.
import path from "path";         // Imports path to handle and transform file paths.

const port = 2000;               // Defines the port on which the server will listen for incoming requests.
const app = express();           // Initializes an Express application.

app.use(cors());                 // Enables CORS for all routes, allowing requests from other origins (e.g., frontend apps).

// Resolve the directory path where the server.js is located
const __dirname = path.resolve(); // Sets __dirname to the current working directory path (e.g., where server.js is located).
console.log(__dirname);           // Logs the current directory path to the console.

// Define the uploads directory path
const uploadDir = path.join(__dirname, "uploads"); // Joins the current directory path with "uploads" to form a full path.

if (!fs.existsSync(uploadDir)) {  // Checks if the "uploads" directory exists.
  fs.mkdirSync(uploadDir);        // If "uploads" does not exist, creates the directory.
}

// Configure Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => { // Specifies the directory to store uploaded files.
    cb(null, uploadDir);            // Sets the destination to the "uploads" directory.
  },
  filename: (req, file, cb) => {    // Configures the filename format for uploaded files.
    cb(null, Date.now() + '-' + file.originalname); // Uses the current timestamp + original filename.
  },
});

const upload = multer({ storage: storage }); // Initializes Multer with the storage configuration for handling file uploads.

// Serve uploaded files as static files
app.use('/uploads', express.static(uploadDir)); // Serves files in the "uploads" directory at the /uploads route.

// Middleware to create and write to a text file
const filecounter = (req, res, next) => {
  const filePath = path.join(__dirname, "index.txt"); // Defines the path for the text file.

  // Write "Hi David" into the text file
  fs.writeFile(filePath, "Hi David", (err) => { // Writes a message to the file.
    if (err) {                                  // If there's an error writing the file...
      console.log("Error writing to file:", err); // Log the error to the console.
    } else {                                     // If the file is written successfully...
      console.log("File created and written successfully"); // Log success message.
    }
    next(); // Moves to the next middleware or route handler.
  });
};

// Apply filecounter middleware to the root route
app.get('/', filecounter, (req, res) => { // Calls the filecounter middleware when visiting the root route.
  res.send('Hello World!');               // Sends "Hello World!" as the response after filecounter runs.
});

// Route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) { // Checks if the file was uploaded successfully.
    console.log(req.file); // Logs file details (e.g., name, path, size) to the console.
    res.send({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}` }); // Sends a success message.
  } else {
    res.status(400).send({ error: 'File upload failed' }); // If no file was uploaded, sends a 400 error.
  }
});

app.listen(port, () => { // Starts the server and listens on the specified port.
  console.log(`Server running at http://localhost:${port}`); // Logs the server's URL to the console.
});
