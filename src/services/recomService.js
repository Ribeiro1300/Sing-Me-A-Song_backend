import * as recomRepository from "../repository/recomRepository.js";
import validadeYoutubeUrl from "../middlewares/checkYoutubeURL.js";

async function newRecommendation(name, youtubeLink) {
  if (typeof name != "string") {
    return "Name is not a string";
  }
  if (!validadeYoutubeUrl(youtubeLink)) {
    return "Invalid link";
  }
  const result = await recomRepository.newRecommendation(name, youtubeLink);

  return result.length === 0 ? null : result;
}

async function upVote(id) {
  const result = await recomRepository.upVote(id);
  return result.length === 0 ? null : result;
}

async function downVote(id) {
  const score = await recomRepository.checkScore(id);

  if (score === -5) {
    await recomRepository.deleteRecom(id);
    return "Pontuação excluída";
  }

  const result = await recomRepository.downVote(id);
  return result.length === 0 ? null : result;
}

async function random(fixedChance = null) {
  // 5 saidas possiveis
  const allRecom = await recomRepository.getAllRecom();

  if (allRecom.length === 0) {
    return "Nenhuma recomendação encontrada";
  }

  const lowerThanTen = allRecom.filter((info) => info.score <= 10);
  const greaterThanTen = allRecom.filter((info) => info.score > 10);

  if (lowerThanTen.length === 0) {
    fixedChance = -50;
  } else if (greaterThanTen.length === 0) {
    fixedChance = 150;
  }

  const chance = fixedChance || Math.floor(Math.random() * 100);

  const recoms = chance >= 70 ? await recomRepository.lower() : await recomRepository.greater();

  const randomRecom = Math.floor(Math.random() * recoms.length);
  const result = recoms[randomRecom];

  return { result, chance };
}

export { newRecommendation, upVote, downVote, random };
