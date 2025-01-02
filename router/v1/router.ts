import express from "express";
import asyncHandler from "../../handlers/async-handler";
import saveMessage from "../../functions/saveMessage";
import rateLimit from "express-rate-limit";
import getMessages from "../../functions/get-messages";

const router = express.Router();

router.post(
  "/messages",
  rateLimit({
    windowMs: 1000 * 60 * 60 * 24,
    max: 5,
  }),
  asyncHandler(saveMessage)
);

router.get("/messages", asyncHandler(getMessages));
export default router;
