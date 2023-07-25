import { NextResponse } from "next/server"
import { parse } from "url"
import dbConnect from "@/libs/dbConnect"
import Room from "@/models/rooms"

type Room = {
  status: String
}

export async function POST(req: Request) {
  const parsedURL = parse(req.url, true)
  const { query } = parsedURL
  console.log('\x1b[34mChange room status (req):\x1b[0m', req.url)
  console.log('\x1b[34mChange room status (query):\x1b[0m', query)

  const roomId = query.roomId as string

  try {
    await dbConnect()

    const room = await Room.findById(roomId)
    if (room === null) {
      const response = { success: false, error: 'Room not found' }
      console.log('\x1b[34mResponse:\x1b[0m', response)

      return NextResponse.json(response, { status: 404 })
    }

    if (room.status === 'chatting') {
      room.status = 'waiting'
      room.save()

      const response = { success: true, message: 'Changes status to waiting' }
      console.log('\x1b[34mResponse:\x1b[0m', response)

      return NextResponse.json(response, { status: 200 })
    } else if (room.status === 'waiting') {
      await Room.findByIdAndDelete(roomId)

      const response = { success: true, message: 'Deleted room as it was empty' }
      console.log('\x1b[34mResponse:\x1b[0m', response)

      return NextResponse.json(response, { status: 200 })
    }
  } catch (error) {
    const response = { success: false, message: (error as Error).message }
    console.log('\x1b[34mResponse:\x1b[0m', response)
    console.error(error)

    return NextResponse.json(response, { status: 500 })
  }
}