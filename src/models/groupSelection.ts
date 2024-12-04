import mongoose, { Document, Model, Schema } from "mongoose";

interface TUser extends Document {
  id: string;
  name: string
  topicName: string;
  compatibility: string;
  userEmail: string;
}

const GroupSelectionSchema : Schema<TUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    topicName: { type: String, required: true },
    compatibility: { type: String, required: true },
    userEmail: { type: String, required: true },
  }, 
  { timestamps: true } 

);

const GroupSelection: Model<TUser> =
  mongoose.models.GroupSelection || mongoose.model<TUser>("GroupSelection", GroupSelectionSchema);

export default GroupSelection;
