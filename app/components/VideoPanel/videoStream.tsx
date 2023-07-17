'use client';

export default function VideoStream({ videoSrc }: { videoSrc: string }) {

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <video autoPlay={true} style={{ objectFit: "fill", maxHeight: "100%", maxWidth: "100%" }}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  )
}