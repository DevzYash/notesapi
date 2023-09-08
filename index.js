const express = require("express");
const userRouter = require("./src/routes/userRoutes");
const noteRouter = require("./src/routes/noteRoutes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());
// app.use((req,res,next)=>{
//     console.log("HTTP method : "+ req.method + " Url : "+ req.url);
//     next();
// })

app.use("/users",userRouter);
app.use("/note",noteRouter);

const PORT = process.env.PORT || 5000 ;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started at port : "+ PORT);
    });
})
.catch((error)=>{
    console.log(error);
});



// app.listen(PORT,()=>{
//     console.log("Server is started");
// })

app.get("/",(req,res)=>{
    res.send("Notes api");
})


