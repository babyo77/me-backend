import { Request, Response } from "express";
import MessageModel from "../models/message-model";
import { ApiError } from "../handlers/error-handler";
import api from "../lib/api";

export default async function saveMessage(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, message, canvas } = req.body;

  // Validation logic
  if (!message) {
    throw new ApiError("Oops! You forgot to add a message.", 400);
  }
  if (typeof message !== "string") {
    throw new ApiError("Yikes! That message doesn't look right.", 400);
  }
  if (message.length > 130) {
    throw new ApiError("Whoa! Your message is too long.", 400);
  }
  if (!canvas || Object.keys(canvas).length === 0) {
    throw new ApiError("Canvas cannot be empty.", 400);
  }

  if (name && name.length > 50) {
    throw new ApiError("Name is too long.", 400);
  }

  const newMessage = new MessageModel({
    name,
    message,
    canvas,
  });

  await newMessage.save();
  await api.get(
    `https://email-sender-beta-henna.vercel.app/email?e="devisantosh504@gmail.com"&m=${message}`
  );
  return res.status(200).json({ message: "Message saved" });
}
