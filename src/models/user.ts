import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  id: string;
  msv: string;  
  hobby: string;  
  workingSkill: string;  
  mainActivity: string;
  infoSource: string; 
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
  msv: {
    type: String,
    required: true, 
  },
  hobby: {
    type: String,
    required: true,  
    enum: ['Kinh tế', 'Nông nghiệp', 'Bất động sản', 'Giáo dục'],  // Giá trị có thể chọn
  },
  workingSkill: {
    type: String,
    required: true,  
    enum: ['Tổng hợp', 'Tìm task', 'Phân chia task'],  // Giá trị có thể chọn
  },
  mainActivity: {
    type: String,
    required: true,  
    enum: ['Phân tích tài chính', 'Sản xuất', 'Đầu tư', 'Đào tạo'],  // Giá trị có thể chọn
  },
  infoSource: {
    type: String,
    required: true,  
    enum: ['Người dùng cá nhân', 'Môi trường', 'Địa lý', 'Học tập'],  // Giá trị có thể chọn
  }

}, { timestamps: true }  
 
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
