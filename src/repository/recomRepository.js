import connection from "../database/database.js";

async function newRecommendation(name, youtubeLink) {
  const result = await connection.query(
    `INSERT INTO recommendations (name,"youtubeLink",score) VALUES ($1,$2,$3);`,
    [name, youtubeLink, 0]
  );
  return result.rows;
}

async function upVote(id) {
  const score = await connection.query("SELECT score FROM recommendations WHERE id = $1", [id]);

  if (score.rows === 0) {
    return "ID inválido";
  }

  const result = await connection.query("UPDATE recommendations SET score=$1 WHERE id=$2;", [
    Number(score) + 1,
    id,
  ]);
  return result.rows;
}

async function checkScore(id) {
  const score = await connection.query("SELECT score FROM recommendations WHERE id = $1", [id]);
  return Number(score);
}

async function deleteRecom(id) {
  await connection.query("DELETE FROM recommendations WHERE id=$1;", [id]);
}

async function downVote(id) {
  const score = await connection.query("SELECT score FROM recommendations WHERE id = $1", [id]);

  if (score.rows === 0) {
    return "ID inválido";
  }

  const result = await connection.query("UPDATE recommendations SET score=$1 WHERE id=$2;", [
    Number(score) - 1,
    id,
  ]);
  return result.rows;
}

async function getAllRecoms() {
  const result = await connection.query("SELECT * FROM recommendations;");
  return result.rows;
}

async function greater() {
  const result = await connection.query("SELECT * FROM recommendations WHERE score > 10;");
  return result.rows;
}

async function lower() {
  const result = await connection.query(
    "SELECT * FROM recommendations WHERE score >= -5 AND score <= 10;"
  );
  return result.rows;
}

async function topRecoms(limit) {
  const result = await connection.query("SELECT * FROM recommendations ORDER BY score LIMIT $1", [
    limit,
  ]);
  return result.rows;
}

export {
  newRecommendation,
  upVote,
  checkScore,
  deleteRecom,
  downVote,
  getAllRecoms,
  greater,
  lower,
  topRecoms,
};
