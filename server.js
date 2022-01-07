const express=require('express');
const cors = require('cors');

const app=express();

const corsOptions={
    origin:'http://localhost:8000'
};

app.use(cors(corsOptions));

//parse requests of content-tyep - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//simple route
app.get('/',(req,res)=>{
    res.json({msg:'Welcome To Post'});
});

require('./app/routes/post.route')(app);

const PORT=process.env.PORT||8000;

app.listen(PORT,()=>console.log(`server running on ${PORT}`));