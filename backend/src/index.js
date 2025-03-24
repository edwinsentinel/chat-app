
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use (express.json());//parse incoming request with JSON payloads always put it before the routes
app.use(cookieParser());//parse incoming request with cookies



app.use("/api/auth",authRoutes)
   // to parse the incoming request with JSON payloads

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB()
});

