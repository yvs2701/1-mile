import { useEffect, useRef } from 'react'
import styles from './videopanel.module.css'
import { ICameraVideoTrack, IRemoteVideoTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng"

type TProps = {
  incomingVideo?: IRemoteVideoTrack
  incomingAudio?: IRemoteAudioTrack
  localVideo?: ICameraVideoTrack
}

const VideoPlayer = ({ videoTrack, children }: { videoTrack: IRemoteVideoTrack | ICameraVideoTrack, children?: React.ReactNode }) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    const playerRef = ref.current
    if (!videoTrack || ! playerRef) return

    videoTrack.play(playerRef)
    return () => {
      videoTrack.stop()
    }
  }, [videoTrack])

  return <video ref={ref} autoPlay={true}>{children}</video>
}

export default function VideoPanel({ incomingVideo, incomingAudio, localVideo }: TProps) {
  return (
    <section className={styles["video-screen"]}>
      <div className={styles["video-stream"]}>
        <VideoPlayer videoTrack={incomingVideo!} />
      </div>
      <div className={styles["video-stream"]}>
        <VideoPlayer videoTrack={localVideo!}>
          {/* Add video and mic controls */}
        </VideoPlayer>
      </div>
    </section>
  )
}
