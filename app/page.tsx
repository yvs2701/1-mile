'use client';
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { RtmChannel } from "agora-rtm-sdk"
import { ICameraVideoTrack, IRemoteVideoTrack, IAgoraRTCClient, IRemoteAudioTrack } from "agora-rtc-sdk-ng"
import { Secondary } from '@/components/Button/button'
import ChatPanelLayout from '@/components/ChatPanel/layout'
import VideoPanel from '@/components/VideoPanel/page'
import styles from './page.module.css'

const anon = '/anonymous-user.svg'
const logo = '/logo.png'
const inter = Inter({ weight: ['700'], subsets: ['latin'], display: 'swap' })

type TCreateRoomResponse = {
  room: Room
  rtcToken: string
  rtmToken: string
}

type TGetRandomRoomResponse = {
  rtcToken: string
  rtmToken: string
  room: Room | null
}

type Room = {
  _id: string
  status: string
}

type TMessage = {
  userId: string
  message: string | undefined
}

async function createRoom(userId: string): Promise<TCreateRoomResponse> {
  const response = await fetch(`/api/rooms?userId=${userId}`, { method: "POST" })
  return await response.json()
}

async function getRandomRoom(userId: string): Promise<TGetRandomRoomResponse> {
  const response = await fetch(`/api/rooms?userId=${userId}`)
  return await response.json()
}

async function changeRoomStatus(roomId: string): Promise<any> {
  const response = await fetch(`/api/rooms/room?roomId=${roomId}`, { method: "POST" })
  return await response.json()
}

async function connectToAgoraRtc(
  roomId: string,
  userId: string,
  onVideoConnect: any,
  onWebcamStart: any,
  onAudioConnect: any,
  token: string
) {
  const { default: AgoraRTC } = await import("agora-rtc-sdk-ng")

  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  })

  await client.join(
    process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    roomId,
    token,
    userId
  )

  client.on("user-published", (themUser, mediaType) => {
    client.subscribe(themUser, mediaType).then(() => {
      if (mediaType === "video") {
        onVideoConnect(themUser.videoTrack)
      }
      if (mediaType === "audio") {
        onAudioConnect(themUser.audioTrack)
        themUser.audioTrack?.play()
      }
    })

  })

  const tracks = await AgoraRTC.createMicrophoneAndCameraTracks()
  onWebcamStart(tracks[1])
  await client.publish(tracks)

  return { tracks, client }
}

async function connectToAgoraRtm(
  roomId: string,
  userId: string,
  onMessage: (message: TMessage) => void,
  token: string
) {
  const { default: AgoraRTM } = await import("agora-rtm-sdk")
  const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_APP_ID!)
  await client.login({
    uid: userId,
    token,
  })
  const channel = client.createChannel(roomId)
  
  // Display connection state changes
  // client.on('ConnectionStateChanged', function (state, reason) {
  //   console.log("State changed To:", state + "\nReason:", reason)
  // })

  await channel.join()
  channel.on("ChannelMessage", (message, userId) => {
    onMessage({
      userId,
      message: message.text,
    })
  })

  channel.on('MemberCountUpdated', function (memberCount) {
    console.log("Member count updated:", memberCount)
  })

  return {
    channel,
  }
}



export default function Home() {
  const { data: session, status } = useSession({ required: true })
  const [userId] = useState<string>(session?.user?.email ?? parseInt((Math.random() * 1e6).toString()).toString())
  const [currRoom, setCurrRoom] = useState<Room | null>(null)

  const [messages, setMessages] = useState<TMessage[]>([])
  const [input, setInput] = useState<string>("")

  const [themAudio, setThemAudio] = useState<IRemoteAudioTrack>()
  const [themVideo, setThemVideo] = useState<IRemoteVideoTrack>()
  const [myVideo, setMyVideo] = useState<ICameraVideoTrack>()

  const channelRef = useRef<RtmChannel>()
  const rtcClientRef = useRef<IAgoraRTCClient>()

  useEffect(() => {
    // // Join a room immediately after signing in !!
    // (async () => {
    //   await connectToARoom()
    // })()
    return () => {
      if (channelRef.current) {
        channelRef.current.leave()
      }

      if (rtcClientRef.current) {
        rtcClientRef.current.leave()
      }

      if (currRoom !== null) {
        changeRoomStatus(currRoom._id)
      }
    }
  }, [currRoom])

  async function handleSubmitClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()

    await channelRef.current?.sendMessage({
      text: input,
    })

    /* [FIX ME]: HANDLE ERRORS IN SENDING THE MESSAGE */

    setMessages((curr) => [
      ...curr,
      {
        userId,
        message: input,
      },
    ])

    setInput("")
  }

  async function handleSignOut() {
      if (channelRef.current) {
        channelRef.current.leave()
      }

      if (rtcClientRef.current) {
        rtcClientRef.current.leave()
      }

      if (currRoom !== null) {
        await changeRoomStatus(currRoom._id)
      }
    await signOut()
  }

  async function connectToARoom() {
    setThemAudio(undefined)
    setThemVideo(undefined)
    // setMyVideo(undefined)
    setMessages([])

    if (channelRef.current) {

      await channelRef.current.leave()
      if (currRoom)
        await changeRoomStatus(currRoom._id)
      setCurrRoom(null)
    }

    if (rtcClientRef.current) {
      /* [FIX ME]: CLIENT DOESNT NEED TO LEAVE AND REAUTHENTICATE AGAIN AND AGAIN */
      rtcClientRef.current.leave()
    }

    const { room, rtcToken, rtmToken } = await getRandomRoom(userId)

    if (room !== undefined && room !== null) {
      setCurrRoom((prev) => {
        console.log('Leaving room', prev)
        return room
      })
      const { channel } = await connectToAgoraRtm(
        room._id,
        userId,
        (message: TMessage) => setMessages((cur) => [...cur, message]),
        rtmToken
      )
      channelRef.current = channel

      const { tracks, client } = await connectToAgoraRtc(
        room._id,
        userId,
        (incomingVideo: IRemoteVideoTrack) => setThemVideo(incomingVideo),
        (webcamVideo: ICameraVideoTrack) => setMyVideo(webcamVideo),
        (incomingAudio: IRemoteAudioTrack) => setThemAudio(incomingAudio),
        rtcToken
      )

      rtcClientRef.current = client
    } else {
      const { room, rtcToken, rtmToken } = await createRoom(userId)
      setCurrRoom((prev) => {
        console.log('Leaving room', prev)
        return room
      })

      const { channel } = await connectToAgoraRtm(
        room._id,
        userId,
        (message: TMessage) => setMessages((cur) => [...cur, message]),
        rtmToken
      )
      channelRef.current = channel

      const { tracks, client } = await connectToAgoraRtc(
        room._id,
        userId,
        (incomingVideo: IRemoteVideoTrack) => setThemVideo(incomingVideo),
        (webcamVideo: ICameraVideoTrack) => setMyVideo(webcamVideo),
        (incomingAudio: IRemoteAudioTrack) => setThemAudio(incomingAudio),
        rtcToken
      )

      rtcClientRef.current = client
    }
  }

  return (
    status !== "authenticated" ? <>Please Sign-in to continue</> :
    <>
      <nav className={styles['navbar']}>
        <div className={styles['navbar-left']}>
          <Image src={logo} alt='logo' width={50} height={50} className={styles['navbar-logo']} />
          <h3 className={`${inter.className} ${styles['navbar-brand']}`}>1-mile</h3>
        </div>
        <div className={styles['navbar-right']}>
          <div className={styles['navbar-right-user']}>
            <Image src={session?.user?.image ?? anon} alt='user pfp' width={50} height={50} />
            <span>{session?.user?.name ?? 'Unknown User'}</span>
          </div>
          <Secondary label="Sign Out" handleClick={handleSignOut} />
        </div>
      </nav>
      <main className={styles.main}>
        <VideoPanel incomingVideo={themVideo} incomingAudio={themAudio} localVideo={myVideo} />
        <ChatPanelLayout user={userId} messageInput={input} setMessageInput={setInput} messages={messages} handleNextClick={connectToARoom} handleSubmitClick={handleSubmitClick} />
      </main>
    </>
  )
}
