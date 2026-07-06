console.log("******** MY SERVER STARTED ********");
require("dotenv").config();
console.log(process.env);
const express=require("express");
const cors=require("cors");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const app=express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use("/api/auth", authRoutes);
console.log(taskRoutes);
app.use("/api/tasks",taskRoutes);
require("./src/db/db");
app.get("/",(req,res)=>{
    res.send("task management API running");
});
app.post("/hello", (req, res) => {
    console.log("HELLO HIT");
    res.json({ message: "Hello" });
});
const PORT =process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});