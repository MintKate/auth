import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        // Destructure the incoming JSON body
        const { name, email, password, confirmPassword, msv, hobby, workingSkill, mainActivity,  infoSource} = await request.json();

        console.log("Received request data:", { name, email, password, confirmPassword, msv, hobby, workingSkill, mainActivity,  infoSource });

        // Check if all fields are provided
        if (!name || !email || !password || !confirmPassword || !msv || !hobby || !workingSkill || !mainActivity || !infoSource) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Validate the email format
        const isValidEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "Email không đúng định dạng!" }, { status: 400 });
        }

        // Ensure the passwords match
        if (confirmPassword !== password) {
            return NextResponse.json({ message: "Mật khẩu cần xác nhận lại, vui lòng nhập đúng!" }, { status: 400 });
        }

        // Ensure password is at least 6 characters long
        if (password.length < 5) {
            return NextResponse.json({ message: "Mật khẩu phải có ít nhất 5 ký tự!" }, { status: 400 });
        }

        // Connect to the database
        if (mongoose.connection.readyState === 0) {
            await connectToDatabase();
        }
        

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Người dùng đã tồn tại!" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            msv,
            hobby,
            workingSkill,
            mainActivity,
            infoSource,
        });

        // Save the new user to the database
        try {
            await newUser.save();
        } catch (error) {
            console.error("Lỗi lưu người dùng:", error);
            return NextResponse.json({ message: "Lỗi lưu người dùng vào CSDL!" }, { status: 500 });
        }
        

        // Return success message
        return NextResponse.json({ message: "Đăng ký thành công" }, { status: 201 });

    } catch (error) {
        // Log detailed error for debugging
        console.error("Lỗi đăng ký:", error);

        // Return generic error message to the client
        return NextResponse.json({ message: "Something went wrong, please try again later!" }, { status: 500 });
    }
}
