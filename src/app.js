import express from "express";
import cors from "cors";
import { auth } from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cors());



export default app;
