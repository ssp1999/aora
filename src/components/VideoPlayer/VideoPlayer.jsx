import { useVideoPlayer, VideoView } from "expo-video"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

const VideoPlayer = forwardRef((_, ref) => {
  const videoRef = useRef(null)
  const player = useVideoPlayer(null, (player) => {
    player.loop = true
  })

  const openVideoPlayer = useCallback((videoSource) => {
    player.replace(videoSource)
    player.play()
    videoRef.current.enterFullscreen()
  }, [player])

  const handleOnFullscreenExit = useCallback(() => {
    player.replay()
    player.pause()
    player.replace(null)
  }, [player])

  useImperativeHandle(ref, () => ({
    openVideoPlayer,
  }))

  return (
    <VideoView
      player={player}
      ref={videoRef}
      style={{ display: 'none' }}
      onFullscreenExit={handleOnFullscreenExit}
    />
  )
})

export default VideoPlayer