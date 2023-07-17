import styles from './videopanel.module.css'
import VideoStream from './videoStream'

export default function VideoPanelLayout({ children }: { children?: React.ReactNode }) {
  return (
    <section className={styles["video-screen"]}>
      <VideoStream videoSrc='https://media.istockphoto.com/id/1254202819/video/young-man-looking-to-camera-and-listening.mp4?s=mp4-640x640-is&k=20&c=4NSlTs-TzYXT7vn2uiXj9MXdc_7U5wt8_PcNy4P-4p8=' />
      <VideoStream videoSrc='https://media.istockphoto.com/id/1207225054/video/happy-indian-business-woman-making-video-conference-call-in-office.mp4?s=mp4-640x640-is&k=20&c=8h45cKwgMiqueTT5vJHQxcptiBnH3ou6JUeABXlRDmI='/>
      {children ?? ''}
    </section>
  )
}
