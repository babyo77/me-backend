import mongoose, { Document } from "mongoose";

interface IMessage extends Document {
  name?: string;
  message: string;
  canvas: any;
  image: string;
  username?: string;
  del_image: string;
  ip?: string;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    del_image: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      required: true,
      maxlength: 130,
    },
    canvas: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    username: {
      type: String,
      default: "tanmay",
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
