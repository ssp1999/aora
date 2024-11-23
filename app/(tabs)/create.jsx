import { View, Text, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Formik } from 'formik'
import { validation } from '../../helpers/validation'
import VideoUploadField from '../../components/VideoUploadField'
import ThumbnailImageField from '../../components/ThumbnailImageField'
import { usePicker } from '../../hooks/usePicker'

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const { file: image, openPicker: openPickerImage } = usePicker(['images'])
  const { file: video, openPicker: openPickerVideo } = usePicker(['videos'])
  const form = {
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  }

  const handleSubmit = async (values, { resetForm }) => {
    setUploading(true)

    try {
      await createVideo({
        ...values,
        userId: user.$id
      })

      Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      resetForm()
      setUploading(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-white text-2xl font-psemibold'>
          Upload Video
        </Text>

        <Formik
          initialValues={form}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
            <View>
              <FormField
                title='Video Title'
                placeholder='Give your video a catch title...'
                otherStyles='mt-10'
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                error={errors.title}
              />

              <VideoUploadField
                video={video}
                error={errors.video}
                handlePicker={openPickerVideo}
                setFieldValue={setFieldValue}
              />

              <ThumbnailImageField
                image={image}
                error={errors.thumbnail}
                handlePicker={openPickerImage}
                setFieldValue={setFieldValue}
              />

              <FormField
                title='AI Prompt'
                placeholder='The prompt you used to create this video'
                otherStyles='mt-7'
                value={values.prompt}
                onChangeText={handleChange('prompt')}
                onBlur={handleBlur('prompt')}
                error={errors.prompt}
              />

              <CustomButton
                title='Submit & Publish'
                handlePress={handleSubmit}
                isLoading={uploading}
                containerStyles='mt-7'
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create