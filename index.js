const express=require('express');
const cors=require('cors');
const app =express();
const userRoutes=require('./routes/userRoutes');
require('dotenv').config();
app.use(express.json());
app.use(cors());
// app.use(dotenv());

// app.get('/',(req,res)=>{
//     res.send({msg:"Running"});
// });
app.use('/',userRoutes);

const port=process.env.PORT;

app.listen(port,()=>console.log("Up and Running at 5000"));