import express from "express";
import cors from "cors";
import * as recomController from "./controllers/recomController.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/recommendations", recomController.newRecommendation);

export default app;
