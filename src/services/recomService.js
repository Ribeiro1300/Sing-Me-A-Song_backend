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

export { newRecommendation, upVote, downVote };
