/* eslint-disable no-undef */
import "../../src/setup.js";
import connection from "../../src/database/database.js";
import * as userService from "../../src/services/recomService.js";
import * as userRepository from "../../src/repository/recomRepository.js";

describe("POST /recommendations", () => {
  const test = jest.spyOn(userRepository, "newRecommendation");

  it("Should return the information requested for valid params", async () => {
    test.mockImplementation(() => {
      return ["info"];
    });
    const result = await userService.newRecommendation(
      "Jhonatan",
      "https://www.youtube.com/watch?v=SWaUNUy2uJI"
    );
    expect(result).toEqual(["info"]);
  });

  it("Should return null for repository problems but valids params but", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await userService.newRecommendation(
      "Jhonatan",
      "https://www.youtube.com/watch?v=SWaUNUy2uJI"
    );
    expect(result).toBeNull();
  });

  it("Should return 'Name is not a string' for name not being a string", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await userService.newRecommendation(
      1,
      "https://www.youtube.com/watch?v=SWaUNUy2uJI"
    );
    expect(result).toEqual("Name is not a string");
  });

  it("Should 'Invalid link' for invalid youtube URL", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await userService.newRecommendation("Jhonatan", "youtubeLink.com.br");
    expect(result).toEqual("Invalid link");
  });
});

describe("POST /recommendations/:id/upvote", () => {
  const test = jest.spyOn(userRepository, "upVote");
  it("Should be a truthy for valid id and no repository error", async () => {
    test.mockImplementation(() => {
      return ["Tudo certo"];
    });
    const result = await userService.upVote(1);
    expect(result).toBeTruthy();
  });
  it("Should be null for invalid id or repository error", async () => {
    test.mockImplementation(() => {
      return [];
    });
    const result = await userService.upVote(1);
    expect(result).toBeNull();
  });
});

describe("POST /recommendations/:id/downvote", () => {
  const mockScore = jest.spyOn(userRepository, "checkScore");
  const mockDelete = jest.spyOn(userRepository, "deleteRecom");
  const test = jest.spyOn(userRepository, "downVote");

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
    const result = await userService.downVote(1);
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
    const result = await userService.downVote(1);
    expect(result).toBeNull();
  });

  it("Should return 'Pontuação excluída' for score equal to -5 ", async () => {
    mockScore.mockImplementation(() => {
      return -5;
    });
    mockDelete.mockImplementation(() => {
      return "ok";
    });
    const result = await userService.downVote(1);
    expect(result).toEqual("Pontuação excluída");
  });
});

afterAll(async () => {
  await connection.query("DELETE FROM recommendations;");
  connection.end();
});
