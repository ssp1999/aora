import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import LatestVideoItem from './components/LatestVideoItem'

const LatestVideos = ({ latestVideos, startVideo }) => {
  const [activeItemVideoId, setActiveItemVideoId] = useState(latestVideos[0]?.$id || null)

  const viewableItemsChanged = useCallback(({ changed, viewableItems }) => {
    const videoId = viewableItems[0]?.item?.$id

    if (videoId !== undefined && videoId !== activeItemVideoId) {
      setActiveItemVideoId(videoId)
    }
  }, [activeItemVideoId])


  return (
    <FlatList
      data={latestVideos}
      keyExtractor={useCallback((video) => video.$id, [])}
      renderItem={({ item: video }) => (
        <LatestVideoItem
          activeItemVideoId={activeItemVideoId}
          video={video}
          startVideo={startVideo}
        />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
        waitForInteraction: true
      }}
    />
  )
}

export default LatestVideos