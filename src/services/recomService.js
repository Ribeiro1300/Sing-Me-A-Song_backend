import * as recomRepository from "../repository/recomRepository.js";

async function newRecommendation(name, youtubeLink) {
  const result = await recomRepository.newRecommendation(name, youtubeLink);
  return result.length === 0 ? null : result;
}

export { newRecommendation };
