import * as recomService from "../services/recomService.js";

async function newRecommendation(req, res) {
  try {
    const { name, youtubeLink } = req.body;

    const result = await recomService.newRecommendation(name, youtubeLink);
    if (!result) {
      res.send(201);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { newRecommendation };
