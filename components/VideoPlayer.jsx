import { useVideoPlayer, VideoView } from "expo-video"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef(null)
  const player = useVideoPlayer(null, (player) => {
    player.bufferOptions = {
      minBufferForPlayback: 0,
      preferredForwardBufferDuration: 0,
      waitsToMinimizeStalling: false
    }
  })

  const openVideoPlayer = useCallback((videoSource) => {
    player.loop = true
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