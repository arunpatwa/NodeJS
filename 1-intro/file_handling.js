const fs = require("fs");

//file system call

//synchronous call -> it always return something -> Blocking request
const rs=fs.writeFileSync("./test.txt", "Hey There");

//Async file -> it always execute a callback function with error & some result.. 
fs.writeFile("./test1.txt", "Hello world Async", (err) => {});

//******************* READ FILE *********************//

const result=fs.readFileSync("./contacts.txt","utf-8");
console.log(result);

//below is the async function which does not return anything --> it is a void function
// async- non blocking -> they will executed later ....
fs.readFile("./contacts.txt","utf-8",(err,result)=>{
    if(err){
        console.log("Error",err);
    }
    else{
        console.log(result);
    }
});

fs.appendFileSync('./test.txt',`${Date.now()} \n`)

//copy files
fs.cpSync('./test.txt','./copy.txt');

fs.unlinkSync('./copy.txt')

console.log(fs.statSync('./test.txt'))

fs.mkdirSync("my-docs/a/b",{recursive:true });


const os = require('os')
console.log(os.cpus().length) 


