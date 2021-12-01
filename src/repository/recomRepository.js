import connection from "../database/database.js";

async function newRecommendation(name, youtubeLink) {
  const result = await connection.query(
    `INSERT INTO recommendations (name,"youtubeLink",score) VALUES ($1,$2,$3);`,
    [name, youtubeLink, 0]
  );
  return result.rows;
}

export { newRecommendation };
