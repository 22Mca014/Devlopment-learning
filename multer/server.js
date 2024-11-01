import express from "express";
import multer from "multer";
const port=2000;
const app = express();
app.get('/',(req,res)=>{
    res.send('Hello World!');
});
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})
const storage=multer.diskStorage({
    destination:
    (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename:
    (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file); // Information about the uploaded file
    res.send('File uploaded successfully');
  });
  