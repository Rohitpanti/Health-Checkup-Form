const express=require("express");
const { fstat } = require("fs");
const path=require("path");
const fs=require("fs");

const app=express();
const port=80;

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));//for serving static files
app.use(express.urlencoded())


//PUG SPECIFIC STUFF
app.set('view engine', 'pug');//Set the Template Engine as pug
app.set('views',path.join(__dirname,'views'));//Set the  View directory

//ENDPOINTS
app.get('/',(req,res)=>{
  const con="This is the best content on the internet so far so use it  wisely";
  const params={'title':'PUBG is the Best Game', "content":con}
  res.status(200).render('index.pug',params);
});

app.post('/',(req,res)=>{
  name=req.body.name
  age=req.body.age
  gender=req.body.gender
  issues=req.body.issues
  more=req.body.more

  let outputToWrite =`the name of the client is ${name},${age}years old,${gender},has ${issues}. More about him/her:${more}`
  fs.writeFileSync('output.txt', outputToWrite)
  const params={'message':'Your Form has been submitted succesfully'}
  res.status(200).render('index.pug',params);

})
//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port  ${port}`);
});