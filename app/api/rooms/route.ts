import { RtcTokenBuilder, RtmTokenBuilder, RtcRole } from "agora-token"
import dbConnect from "@/libs/dbConnect"
import Room from "@/models/rooms"
import { parse } from "url"
import { NextResponse } from "next/server"

type Room = {
  status: String
}

function getRtmToken(userId: string) {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!
  const appCertificate = process.env.AGORA_APP_CERT!
  const account = userId

  const expirationTimeInSeconds = 3600
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const privilegeExpires = currentTimestamp + expirationTimeInSeconds

  const token = RtmTokenBuilder.buildToken(
    appID,
    appCertificate,
    account,
    privilegeExpires
  )
  return token
}

function getRtcToken(roomId: string, userId: string) {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!
  const appCertificate = process.env.AGORA_APP_CERT!
  const channelName = roomId
  const account = userId
  const role = RtcRole.PUBLISHER

  const expirationTimeInSeconds = 3600
  const currentTimestamp = Math.floor(Date.now() / 1000)
  const privilegeExpires = currentTimestamp + expirationTimeInSeconds

  const token = RtcTokenBuilder.buildTokenWithUserAccount(
    appID,
    appCertificate,
    channelName,
    account,
    role,
    privilegeExpires,
    privilegeExpires
  )

  return token
}

export async function GET(req: Request) {
  // FETCH A RANDOM ROOM WITH STATUS WAITING
  const parsedURL = parse(req.url, true)
  const { query } = parsedURL
  console.log('\x1b[34mGet room (req):\x1b[0m', req.url)
  console.log('\x1b[34mGet room (query):\x1b[0m', query)

  const userId = query.userId as string

  try {
    await dbConnect()

    const count = await Room.countDocuments({ status: "waiting" })
    if (count > 0) {
      const random = Math.floor(Math.random() * count) // to get a random room (value lies in range [0, count - 1])
      const room = await Room.findOne({ status: "waiting" }).skip(random).exec()

      console.log('\x1b[34mPicked room:\x1b[0m', room)

      if (room === null) {
        const response = {
          success: true,
          room,
          rtcToken: [],
          rtmToken: [],
        }
        console.log('\x1b[34mResponse:\x1b[0m', response)
        return NextResponse.json(response, { status: 200 })
      }


      room.status = "chatting"
      room.save()

      const response = {
        success: true,
        room,
        rtcToken: getRtcToken(room._id.toString(), userId),
        rtmToken: getRtmToken(userId),
      }
      console.log('\x1b[34mResponse:\x1b[0m', response)
      return NextResponse.json(response, { status: 200 })
    } else {
      const room = null

      const response = {
        success: true,
        room,
        rtcToken: [],
        rtmToken: [],
      }
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

export async function POST(req: Request) {
  // CREATE A NEW ROOM
  const parsedURL = parse(req.url, true)
  const { query } = parsedURL
  console.log('\x1b[34mCreate room (req):\x1b[0m', req.url)
  console.log('\x1b[34mCreate room (query):\x1b[0m', query)

  const userId = query.userId as string

  try {
    await dbConnect()

    const room = await Room.create({
      status: "waiting",
    })

    const response = {
      success: true,
      room,
      rtcToken: getRtcToken(room._id.toString(), userId),
      rtmToken: getRtmToken(userId),
    }
    console.log('\x1b[34mResponse:\x1b[0m', response)
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const response = { success: false, message: (error as Error).message }
    console.log('\x1b[34mResponse:\x1b[0m', response)
    console.error(error)
    return NextResponse.json(response, { status: 500 })
  }
}