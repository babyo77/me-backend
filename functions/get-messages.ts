import { Request, Response } from "express";
import MessageModel from "../models/message-model";

export default async function getMessages(
  _req: Request,
  res: Response
): Promise<Response> {
  const messages = await MessageModel.find({}).select("name message image ");
  return res.status(200).json(messages);
}
