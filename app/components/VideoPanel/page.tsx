import { useEffect, useRef } from 'react'
import styles from './videopanel.module.css'

export default function VideoPanel() {
  const videoRef = useRef<any>(null)

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        let video = videoRef.current!
        video.srcObject = stream
        video.play()
      })
      .catch(err => {
        console.error("error:", err)
      })
  }

  useEffect(() => {
    getVideo()
  }, [])

  return (
    <section className={styles["video-screen"]}>
      <div className={styles["video-stream"]}>
        <video src='https://media.istockphoto.com/id/1254202819/video/young-man-looking-to-camera-and-listening.mp4?s=mp4-640x640-is&k=20&c=4NSlTs-TzYXT7vn2uiXj9MXdc_7U5wt8_PcNy4P-4p8=' autoPlay={true} />
      </div>
      <div className={styles["video-stream"]}>
        <video ref={videoRef} autoPlay={true} />
      </div>
    </section>
  )
}
