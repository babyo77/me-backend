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
    limit: 5,
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  }),
  asyncHandler(saveMessage)
);

router.get("/messages", asyncHandler(getMessages));
export default router;
