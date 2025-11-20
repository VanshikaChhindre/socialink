import express from "express";
import 'dotenv/config'
import cors from 'cors'
import connectDB from "./configDB/db.js";
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import session from "express-session";

import passport from "passport"; 
import "./config/googleAuth.js";        


import googleAuthRouter from "./routes/googleAuth.routes.js";
import linkedinRouter from "./routes/linkedin.routes.js";
import instagramRouter from "./routes/instagram.routes.js"




const app = express();

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // secure: true only in production
  })
);

app.get('/', (req, res)=> res.send("APi is working"))

const PORT = process.env.PORT || 5000;

//connecting database
await connectDB()
app.listen(PORT, ()=>{
    console.log('sever is running on port' + PORT)
})




app.use("/api/v1/users", userRouter)

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", googleAuthRouter);
app.use("/api/auth/linkedin", linkedinRouter); 

app.use("/instagram", instagramRouter)



export default app;