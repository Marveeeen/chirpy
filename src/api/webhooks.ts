import type { Request, Response } from "express";

import { config } from "../config.js";
import { upgradeChirpyRed } from "../db/queries/users.js";
import { getAPIKey } from "../auth.js";

import { UserNotAuthenticatedError } from "./errors.js";

export async function handlerWebhook(req: Request, res: Response) {
  type data = {
    userId: string;
  };

  type parameters = {
    event: string;
    data: data;
  };

  const apiKey = getAPIKey(req);
  if (apiKey !== config.api.polkaApiKey) {
    throw new UserNotAuthenticatedError("invalid api key");
  }
  const params: parameters = req.body;

  if (params.event !== "user.upgraded") {
    res.status(204).send();
    return;
  }

  const updated = await upgradeChirpyRed(params.data.userId);

  if (!updated) {
    res.status(404).send();
    return;
  }

  res.status(204).send();
}
