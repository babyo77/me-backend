import { Request, Response } from "express";
import MessageModel from "../models/message-model";
import { ApiError } from "../handlers/error-handler";
import api from "../lib/api";
import cache from "../cache/memory";

export default async function saveMessage(
  req: Request,
  res: Response
): Promise<Response> {
  const { name, message, image, del_image, ip } = req.body;

  // Validation logic

  if (
    !del_image ||
    !del_image.includes("https://") ||
    !image ||
    !image.includes("https://")
  ) {
    throw new ApiError("Fuck! something went wrong.", 400);
  }
  if (!message) {
    throw new ApiError("Oops! You forgot to add a message.", 400);
  }
  if (typeof message !== "string") {
    throw new ApiError("Yikes! That message doesn't look right.", 400);
  }
  if (message.length > 130) {
    throw new ApiError("Whoa! Your message is too long.", 400);
  }

  if (name && name.length > 50) {
    throw new ApiError("Name is too long.", 400);
  }

  const newMessage = new MessageModel({
    name,
    message,
    image,
    del_image,
    ip,
  });
  const savePromise = newMessage.save();
  // const emailPromise = api.get(
  //   `https://email-sender-beta-henna.vercel.app/email?e="devisantosh504@gmail.com"&m=${message}`
  // );

  await Promise.allSettled([savePromise]);

  cache.del("messages");
  return res.status(204).send();
}
