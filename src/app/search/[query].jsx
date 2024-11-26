import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { useEffect } from 'react'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))

  console.log(query, posts)

  useEffect(() => {
    refetch()
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