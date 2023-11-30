const express=required('express');

const app=express();

app.use(express.urlencoded({extended:false}));
app.get('/form',function(req,res){
    res.send('<form action="/store-user" method="POST"><label for="username>Username</label><input type="text" id="username" name="user-name"><button>submit</button></form>');
});
app.post('/stored-user',function(req,res){
    const userName=req.body.username;
    console.log(userName);
    res.send('<h1>Username stored succesfully</h1>');
});
app.listen(3000);

/*const fs=require('fs');
const path=require('path');

const express=require('express');

const app=express();

app.use(express.urlencoded({extended:false}));

app.get('/',function(req,res){
    res.send('<form action="/stored-user" method="POST"><label for="user-name">username</label><input type="text" id="user-name" name="username"><button>submit</button></form>');
});
app.post('/stored-user',function(req,res){
    const userName=req.body.username;

    const filePath=path.join(__dirname, 'data', 'users.json');

    const fileData=fs.readFileSync(filePath);
    const existingUsers=JSON.parse(fileData);

    existingUsers.push(userName);

    fs.writeFileSync(filePath,JSON.stringify(existingUsers));

    res.send('<h1>Username stored</h1>');
});
app.get('/users',function(req,res){
    const filePath=path.join(__dirname,'data','users.json');

    const fileData=fs.readFileSync(filePath);
    const existingUsers=JSON.parse(fileData);

    res.send(existingUsers);
});
app.listen(3000);*/