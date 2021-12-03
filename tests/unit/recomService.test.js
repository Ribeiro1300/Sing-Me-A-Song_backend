/* eslint-disable no-undef */
import "../../src/setup.js";
import connection from "../../src/database/database.js";
import * as recomService from "../../src/services/recomService.js";
import * as recomRepository from "../../src/repository/recomRepository.js";

describe("POST /recommendations", () => {
  const test = jest.spyOn(recomRepository, "newRecommendation");

  it("Should return the information requested for valid params", async () => {
    test.mockImplementation(() => {
      return ["info"];
    });
    const result = await recomService.newRecommendation(
      "Jhonatan",
      "https://www.youtube.com/watch?v=SWaUNUy2uJI"
    );
    expect(result).toEqual(["info"]);
  });

  it("Should return null for repository problems but valids params but", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await recomService.newRecommendation(
      "Jhonatan",
      "https://www.youtube.com/watch?v=SWaUNUy2uJI"
    );
    expect(result).toBeNull();
  });

  it("Should return 'Name is not a string' for name not being a string", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await recomService.newRecommendation(
      1,
      "https://www.youtube.com/watch?v=SWaUNUy2uJI"
    );
    expect(result).toEqual("Name is not a string");
  });

  it("Should 'Invalid link' for invalid youtube URL", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await recomService.newRecommendation("Jhonatan", "youtubeLink.com.br");
    expect(result).toEqual("Invalid link");
  });
});

describe("POST /recommendations/:id/upvote", () => {
  const test = jest.spyOn(recomRepository, "upVote");
  const mockUserId = 1;

  it("Should be a truthy for valid id and no repository error", async () => {
    test.mockImplementation(() => {
      return ["Tudo certo"];
    });
    const result = await recomService.upVote(mockUserId);
    expect(result).toBeTruthy();
  });
  it("Should be null for invalid id or repository error", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await recomService.upVote(mockUserId);
    expect(result).toBeNull();
  });
});

describe("POST /recommendations/:id/downvote", () => {
  const mockScore = jest.spyOn(recomRepository, "checkScore");
  const mockDelete = jest.spyOn(recomRepository, "deleteRecom");
  const test = jest.spyOn(recomRepository, "downVote");
  const mockUserId = 1;

  it("Should be a truthy for valid id and no repository error", async () => {
    mockScore.mockImplementation(() => {
      return 10;
    });
    mockDelete.mockImplementation(() => {
      return "ok";
    });
    test.mockImplementation(() => {
      return ["Tudo certo"];
    });
    const result = await recomService.downVote(mockUserId);
    expect(result).toBeTruthy();
  });

  it("Should be null for invalid id or repository error", async () => {
    mockScore.mockImplementation(() => {
      return 10;
    });
    mockDelete.mockImplementation(() => {
      return "ok";
    });
    test.mockImplementation(() => {
      return [];
    });
    const result = await recomService.downVote(mockUserId);
    expect(result).toBeNull();
  });

  it("Should return 'Pontuação excluída' for score equal to -5 ", async () => {
    mockScore.mockImplementation(() => {
      return -5;
    });
    mockDelete.mockImplementation(() => {
      return "ok";
    });
    const result = await recomService.downVote(mockUserId);
    expect(result).toEqual("Pontuação excluída");
  });
});

describe("GET /random", () => {
  const allRecoms = jest.spyOn(recomRepository, "getAllRecom");
  const greaterChance = jest.spyOn(recomRepository, "greater");
  const lowerChance = jest.spyOn(recomRepository, "lower");

  it("Should return 'Nenhuma recomendação encontrada' for empty recom table", async () => {
    allRecoms.mockImplementation(() => {
      return [];
    });

    const result = await recomService.random();

    expect(result).toEqual("Nenhuma recomendação encontrada");
  });

  it("The chance value should be -50 for none recom with score lower than 10", async () => {
    allRecoms.mockImplementation(() => {
      return [{ score: 20 }];
    });

    const result = await recomService.random();

    expect(result.chance).toEqual(-50);
  });

  it("The chance value should be 150 for none recom with score greater than 10", async () => {
    allRecoms.mockImplementation(() => {
      return [{ score: 0 }];
    });

    const result = await recomService.random();

    expect(result.chance).toEqual(150);
  });

  it("Should return 'Greater than 10' for fixed chance of 20", async () => {
    allRecoms.mockImplementation(() => {
      return [{ score: 0 }, { score: 20 }];
    });
    greaterChance.mockImplementation(() => {
      return ["Greater than 10"];
    });

    const result = await recomService.random(20);

    expect(result.result).toEqual("Greater than 10");
  });

  it("Should return 'Greater or equal to -5 and lower or equal to 10' for fixed chance of 90", async () => {
    lowerChance.mockImplementation(() => {
      return ["Greater or equal to -5 and lower or equal to 10"];
    });

    const result = await recomService.random(90);

    expect(result.result).toEqual("Greater or equal to -5 and lower or equal to 10");
  });
});

afterAll(async () => {
  await connection.query("DELETE FROM recommendations;");
  connection.end();
});
