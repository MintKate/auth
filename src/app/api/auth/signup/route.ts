import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        // Destructure the incoming JSON body
        const { name, email, password, confirmPassword, gpa, programmingSkill, teamworkSkill, hobby } = await request.json();

        console.log("Received request data:", { name, email, password, confirmPassword, gpa, programmingSkill, teamworkSkill, hobby });

        // Check if all fields are provided
        if (!name || !email || !password || !confirmPassword || !gpa || !programmingSkill || !teamworkSkill || !hobby) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Validate the email format
        const isValidEmail = (email: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        // Ensure the passwords match
        if (confirmPassword !== password) {
            return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
        }

        // Ensure password is at least 6 characters long
        if (password.length < 6) {
            return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 });
        }

        // Connect to the database
        if (mongoose.connection.readyState === 0) {
            await connectToDatabase();
        }
        

        // Check if the user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            gpa,
            programmingSkill,
            teamworkSkill,
            hobby,
        });

        // Save the new user to the database
        try {
            await newUser.save();
        } catch (error) {
            console.error("Error saving new user:", error);
            return NextResponse.json({ message: "Error saving user to database" }, { status: 500 });
        }
        

        // Return success message
        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        // Log detailed error for debugging
        console.error("Error during user signup:", error);

        // Return generic error message to the client
        return NextResponse.json({ message: "Something went wrong, please try again later" }, { status: 500 });
    }
}
