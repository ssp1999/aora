import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, disabled, showLoader }) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${disabled ? 'opacity-50' : ''}`}
      onPress={handlePress}
      disabled={disabled}
    >
      {showLoader ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton