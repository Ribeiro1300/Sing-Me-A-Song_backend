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
  try {
    const { id } = req.body;

    const result = await recomService.upVote(id);

    if (result === "ID inválido") {
      res.status(404).send("ID inválido");
    }
    res.send(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function downVote(req, res) {
  try {
    const { id } = req.body;

    const result = await recomService.downVote(id);
    if (result === "ID inválido") {
      res.status(404).send("ID inválido");
    }
    res.send(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

// eslint-disable-next-line no-unused-vars
async function random(req, res) {
  try {
    const result = await recomService.random();

    if (result === "Nenhuma recomendação encontrada") {
      res.sendStatus(404);
    }

    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function topRecoms(req, res) {
  try {
    const { ammout } = req.body;

    const topRecoms = await recomService.topRecoms(ammout);

    if (topRecoms === "Nenhuma recomendação encontrada") {
      res.sendStatus(404);
    } else if (topRecoms.message) {
      res.status(202).send(topRecoms.result, topRecoms.message);
    }

    res.status(201).send(topRecoms.result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export { newRecommendation, upVote, downVote, random, topRecoms };
