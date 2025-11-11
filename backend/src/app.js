import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./configDB/db.js";
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"

import passport from "./authGoogle/googleAuth.js";
import googleAuthRouter from "./routes/googleAuth.routes.js";



const app = express();

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res)=> res.send("APi is working"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log('sever is running on port' + PORT)
})

//connecting database
await connectDB()


app.use("/api/v1/users", userRouter)

app.use(passport.initialize());
app.use("/api/auth", googleAuthRouter);

export default app;