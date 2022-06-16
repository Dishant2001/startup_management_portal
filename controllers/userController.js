const mysql=require('mysql2/promise');
const config=require('../config');
const bcrypt=require('bcrypt');

var logged=false;
var loggedUser='';

async function query(sql){
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql);

    return results;
};

const signup=async (req,res)=>{
    console.log(req.body);
    const {user,pass,role}=req.body;
    const salt=await bcrypt.genSalt(10);
    const pass2=await  bcrypt.hash(pass,salt);
    await query(
        `INSERT INTO Users(username,password,role,salt) VALUES("${user}","${pass2}",${role},"${salt}")`
      );

    res.send(req.body);
};

const login=async (req,res)=>{
    console.log(req.body);
    const {user,pass}=req.body;
    // const salt=await bcrypt.genSalt(10);
    const row=await query(
        `SELECT password,salt FROM Users WHERE username="${user}"`
        );
    
    console.log(row);
    if(row.length!=0){

        const salt=row[0]["salt"];
        const pass2=await  bcrypt.hash(pass,salt);
        if(pass2==row[0]["password"]){
            console.log('Authentication Successful! Logged In');
            logged=true;
            loggedUser=user;
        }
        else
            console.log('Incorrect Password!');
        }
        else
            console.log('user does not exist!');
        res.send(req.body);
    };

const startup_details=async (req,res)=>{
    const {user,details,cf1,cf2,cto,cfo,cmo,contact,cf1name,cf1linkedin,cf1link,cf2name,cf2linkedin,cf2link,ctoname,ctolinkedin,ctolink,cfoname,cfolinkedin,cfolink,cmoname,cmolinkedin,cmolink}=req.body;
    if(logged&&user==loggedUser){
        await query(
            `INSERT into startup(username,details,cf1,cf2,cto,cfo,cmo,contact) VALUES("${loggedUser}","${details}","${cf1}","${cf2}","${cto}","${cfo}","${cmo}","${contact}")`
        );

        const temp=[[cf1,cf1name,cf1linkedin,cf1link],[cf2,cf2name,cf2linkedin,cf2link],[cto,ctoname,ctolinkedin,ctolink],[cfo,cfoname,cfolinkedin,cfolink],[cmo,cmoname,cmolinkedin,cmolink]]
        temp.forEach(async element => {
            console.log(element);
            await query(
                `INSERT into members(email,name,linkedin,other) VALUES("${element[0]}","${element[1]}","${element[2]}","${element[3]}")`
            );
        });
        console.log("Insertion successfull!");
        res.send({"user":user});
    }
    else{
        console.log("First Login!");
        res.send({"msg":"Login"});
    }
};

module.exports={signup,login,startup_details};