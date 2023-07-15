import dbConnect from "@/libs/dbConnect"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    await dbConnect()
    console.log("Database Connected!!")
    return NextResponse.json({ success: true, message: "Connected to Database!!" })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ success: false, message: "Problem occured while connecting to Database!" })
  }
}