import { useCallback } from "react"
import { Image, ImageBackground, SafeAreaView, TouchableOpacity, View } from "react-native"
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants'

const LatestVideoItem = ({ activeItemVideoId, video, startVideo }) => {
  const zoomIn = {
    0: { scale: 0.9 },
    1: { scale: 1.1 }
  }

  const zoomOut = {
    0: { scale: 1.1 },
    1: { scale: 0.9 }
  }

  return (
    <SafeAreaView>
      <View>
        <Animatable.View
          className="ml-2"
          animation={activeItemVideoId === video.$id ? zoomIn : zoomOut}
          duration={500}
        >
          <TouchableOpacity
            className="relative justify-center items-center"
            activeOpacity={0.7}
            onPress={() => startVideo(video.video)}
          >
            <ImageBackground
              source={{ uri: video.thumbnail }}
              className="w-52 h-72 rounded-[2.1875rem] my-5 overflow-hidden shadow-lg shadow-black/40"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </SafeAreaView>
  )
}

export default LatestVideoItem
