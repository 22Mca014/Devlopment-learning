import { error } from 'console';
import fs from 'fs';
import path from 'path';
fs.mkdir('../fsSystem/bigB',{recursive:true},(err)=>{
    if(err) console.log(err);
    else
    console.log("Done");
    
})
// 1.read file

fs.readFile('./fsSystem/index.txt', 'UTF8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data); // Print the file contents
    }
});

// 2.write file
fs.writeFile('./fsSystem/index.txt','David Mondal','UTF8',(err,data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log(data); // Print the file contents
    }
})
// 3.remove direcroty
fs.rm('bigB',{recursive:true,force:true},(err)=>{
    if(err) console.log(err);
    else
    console.log("dir remove");
    
})

//4.apped file.
fs.appendFile('./fsSystem/index.txt',"\n shreya",(error,data)=>{
    if(error) console.log(error);
    else
    console.log(data);
})
//5.unlink
fs.unlink('./fsSystem/b.jpg',(error,data)=>{
    if(error) console.log(error);
    else
    console.log(data);})

