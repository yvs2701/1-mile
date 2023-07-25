'use client';
import { useEffect, useRef } from 'react'
import styles from './videopanel.module.css'
import { ICameraVideoTrack, IRemoteVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng"

type TProps = {
  incomingVideo?: IRemoteVideoTrack
  incomingAudio?: IRemoteAudioTrack
  localVideo?: ICameraVideoTrack
}

const VideoPlayer = ({ videoTrack, children }: { videoTrack: IRemoteVideoTrack | ICameraVideoTrack, children?: React.ReactNode }) => {
  const ref = useRef(null)

  useEffect(() => {
    const playerRef = ref.current
    if (!videoTrack || !playerRef) return

    videoTrack.play(playerRef)
    return () => {
      videoTrack.stop()
    }
  }, [videoTrack])

  return (children && <video ref={ref} autoPlay={true}>{children}</video>) || <video ref={ref} autoPlay={true} />
}

export default function VideoPanel({ incomingVideo, incomingAudio, localVideo }: TProps) {
  return (
    <section className={styles["video-screen"]}>
      <div className={styles["video-stream"]}>
        {
          incomingVideo && <VideoPlayer videoTrack={incomingVideo} />
        }
      </div>
      <div className={styles["video-stream"]}>
        {
          localVideo && <VideoPlayer videoTrack={localVideo}>
            {/* [FIX ME]: ADD VIDEO AND MIC CONTROLS */}
          </VideoPlayer>
        }
      </div>
    </section>
  )
}
