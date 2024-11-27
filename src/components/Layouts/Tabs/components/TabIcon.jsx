import { View, Image } from 'react-native'

const TabIcon = ({ icon, color }) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
    </View>
  )
}

export default TabIcon