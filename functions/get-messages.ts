import { Request, Response } from "express";
import MessageModel from "../models/message-model";
import cache from "../cache/memory";

export default async function getMessages(
  _req: Request,
  res: Response
): Promise<Response> {
  if (cache.has("messages")) {
    return res.status(200).json(cache.get("messages"));
  }
  const messages = await MessageModel.find({})
    .sort({ createdAt: -1 })
    .select("name message image ");
  cache.set("messages", messages);
  return res.status(200).json(messages);
}
