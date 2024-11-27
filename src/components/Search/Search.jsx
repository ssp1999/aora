import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/common/SearchInput/SearchInput'
import EmptyState from '@/components/common/EmptyState/EmptyState'
import { useCallback, useEffect } from 'react'
import { searchVideos } from '@/lib/appwrite'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/common/VideoCard/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, fetchData } = useAppwrite(useCallback(() => searchVideos(query), [query]))

  useEffect(() => {
    fetchData()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search results
            </Text>

            <Text className='text-2xl font-psemibold text-white'>
              {query}
            </Text>

            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='No videos found for this search query'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search