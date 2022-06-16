const mysql=require('mysql2/promise');
const config=require('../config');
const bcrypt=require('bcrypt');

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

    const salt=row[0]["salt"];
    const pass2=await  bcrypt.hash(pass,salt);
    if(pass2==row[0]["password"])
        console.log('Authentication Successful! Logged In');
    else
        console.log('Incorrect Password!');
    res.send(req.body);
};

module.exports={signup,login};