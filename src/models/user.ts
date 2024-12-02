import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  id: string;
  gpa: number;  // Thêm trường gpa
  programmingSkill: string;  // Thêm trường kỹ năng lập trình
  teamworkSkill: string;  // Thêm trường kỹ năng làm việc nhóm
  hobby: string;  // Thêm trường sở thích
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  gpa: {
    type: Number,
    required: true,  // gpa là một trường bắt buộc
  },
  programmingSkill: {
    type: String,
    required: true,  // Kỹ năng lập trình là một trường bắt buộc
    enum: ['Rất kém', 'Kém', 'Trung bình', 'Ổn', 'Tốt'],  // Giá trị có thể chọn
  },
  teamworkSkill: {
    type: String,
    required: true,  // Kỹ năng làm việc nhóm là một trường bắt buộc
    enum: ['Tổng hợp', 'Tìm task', 'Phân chia task'],  // Giá trị có thể chọn
  },
  hobby: {
    type: String,
    required: true,  // Sở thích là một trường bắt buộc
    enum: ['Lập trình', 'Thiết kế', 'Phân tích'],  // Giá trị có thể chọn
  }
}, { timestamps: true }  
 
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
