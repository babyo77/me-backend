import mongoose, { Document } from "mongoose";

interface IMessage extends Document {
  name?: string; // Optional field
  message: string; // Required field
  canvas: any; // Mixed type for canvas
  username?: string; // Default value will be "tanmay"
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    name: {
      type: String,
      required: false, // Optional field
    },
    message: {
      type: String,
      required: true,
      maxlength: 130, // Enforce maximum length of 130 characters
    },
    canvas: {
      type: mongoose.Schema.Types.Mixed, // Mixed type for canvas
      required: true,
    },
    username: {
      type: String,
      default: "tanmay", // Default value for username
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
