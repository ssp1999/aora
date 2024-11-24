import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '../constants'
import { useState } from 'react'

const FormField = ({
  title,
  value,
  placeholder,
  otherStyles,
  onChangeText,
  onBlur,
  error,
  secureTextEntry = false,
  touched = false,
  ...props
}) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View
        className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row ${touched && error ? 'border-red-400' : 'border-black-200'}`}
      >
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry && !showPassword}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode='contain'
              className='w-6 h-6'
            />
          </TouchableOpacity>
        )}
      </View>
      {touched && error && <Text className='text-red-400 text-sm mt-1 ml-4'>{error}</Text>}
    </View>
  )
}

export default FormField