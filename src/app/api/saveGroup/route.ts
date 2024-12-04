import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import GroupSelection from '@/models/groupSelection'; // Model mới cho việc lưu nhóm

export async function POST(request: Request) {
    try {
        // Lấy dữ liệu từ body
        const { name, topicName, compatibility, userEmail } = await request.json();

        console.log("Received group selection data:", { name, topicName, compatibility, userEmail });

        // Kiểm tra các trường bắt buộc
        if (!topicName || !compatibility || !userEmail) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Kết nối đến cơ sở dữ liệu
        if (mongoose.connection.readyState === 0) {
            await connectToDatabase();
        }

        // Tìm tất cả người dùng đã chọn nhóm này
        const groupUsers = await GroupSelection.find({ topicName }).sort({ compatibility: 1 }); // Sắp xếp theo độ tương thích tăng dần

        // Kiểm tra số lượng người dùng trong nhóm
        if (groupUsers.length < 5) {
            // Nếu chưa đủ 5 người, thêm người mới vào
            const newGroupSelection = new GroupSelection({
                name,
                topicName,
                compatibility,
                userEmail,
                createdAt: new Date(),
            });

            await newGroupSelection.save();
            return NextResponse.json({ message: "Group selection saved successfully" }, { status: 201 });
        } else {
            // Nếu nhóm đã đầy, kiểm tra độ tương thích với người có độ tương thích thấp nhất
            const lowestCompatibilityUser = groupUsers[0]; // Người có độ tương thích thấp nhất

            // Nếu độ tương thích của người mới cao hơn người có độ tương thích thấp nhất
            if (parseFloat(compatibility) > parseFloat(lowestCompatibilityUser.compatibility)) {
                // Cập nhật người có độ tương thích thấp nhất
                await GroupSelection.findByIdAndUpdate(lowestCompatibilityUser._id, {
                    userEmail,
                    compatibility,
                    updatedAt: new Date(),
                });

                return NextResponse.json({ message: "Group selection updated successfully" }, { status: 200 });
            } else {
                // Nếu không có sự thay đổi, trả về thông báo
                return NextResponse.json({ message: "Your compatibility is not high enough to join this group" }, { status: 400 });
            }
        }
    } catch (error) {
        console.error("Error handling group selection:", error);
        return NextResponse.json({ message: "Something went wrong, please try again later!" }, { status: 500 });
    }
}
