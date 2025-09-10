import type { Request, Response } from "express";

import { respondWithJSON } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLength = 140;
  if (params.body.length > maxChirpLength) {
    throw new Error("Chirp is too long");
  }

  const badWords = {
    kerfuffle: "",
    sharbert: "",
    fornax: "",
  };

  const cleanedBody = getCleanedBody(params.body, badWords);

  respondWithJSON(res, 200, {
    cleanedBody,
  });
}

function getCleanedBody(body: string, badWords: Record<string, string>) {
  const words = body.split(" ");

  const cleanedWords = words.map((word) => {
    if (word.toLowerCase() in badWords) {
      return "****";
    }

    return word;
  });

  return cleanedWords.join(" ");
}
