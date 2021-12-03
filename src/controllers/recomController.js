import * as recomService from "../services/recomService.js";

async function newRecommendation(req, res) {
  try {
    const { name, youtubeLink } = req.body;

    const result = await recomService.newRecommendation(name, youtubeLink);
    if (result === "Name is not a string") {
      res.staus(404).send("Name is not a string");
    }
    if (result === "Invalid link") {
      res.staus(409).send("Invalid link");
    }
    if (result) {
      res.send(201);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function upVote(req, res) {
  const { id } = req.body;
  try {
    const result = await recomService.upVote(id);
    if (!result) {
      res.status(404);
    }
  } catch (error) {
    console.log();
    res.sednStatus(500);
  }
}
async function downVote(req, res) {
  const { id } = req.body;
  try {
    const result = await recomService.downVote(id);
    if (!result) {
      res.status(404);
    }
  } catch (error) {
    console.log();
    res.sednStatus(500);
  }
}
export { newRecommendation, upVote, downVote };
