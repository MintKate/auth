// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import connectToDatabase from "@/lib/mongodb";
// import GroupSelection from "@/models/groupSelection";

// export async function GET() {
//   try {
//     // Kết nối đến cơ sở dữ liệu
//     if (mongoose.connection.readyState === 0) {
//       await connectToDatabase();
//     }

//     // Lấy danh sách thành viên
//     const members = await GroupSelection.find({}, "name topicName compatibility userEmail").lean();

//     return NextResponse.json({ members }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching group details:", error);
//     return NextResponse.json({ message: "Failed to fetch group details" }, { status: 500 });
//   }
// }
