import express from "express";
import cors from "cors";
import * as recomController from "./controllers/recomController.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/recommendations", recomController.newRecommendation);

app.post("/recommendations/:id/upvote", recomController.upVote);

app.post("/recommendations/:id/downvote", recomController.downVote);

app.get("/random", recomController.random);

app.get("/recommendations/top/:amount", recomController.topRecoms);

export default app;
