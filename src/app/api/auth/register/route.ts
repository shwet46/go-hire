import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();
  const { name, email, password } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  return NextResponse.json({ message: "User registered" });
}