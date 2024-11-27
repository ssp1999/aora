import { View, Text, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/common/FormField/FormField'
import { useState } from 'react'
import CustomButton from '@/components/common/CustomButton/CustomButton'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { Formik } from 'formik'
import VideoUploadField from './components/VideoUploadField'
import ThumbnailImageField from './components/ThumbnailImageField'
import { uploadVideoSchema } from '@/validation/uploadVideo'
import { useGlobalContext } from '@/context/GlobalProvider'

const UploadVideoForm = () => {
  const { user } = useGlobalContext()
  const [isSubmiting, setIsSubmiting] = useState(false)
  const form = {
    title: '',
    video: null,
    thumbnail: null
  }

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmiting(true)

    try {
      await createVideo({
        ...values,
        userId: user.$id
      })

      Alert.alert('Success', 'Post uploaded successfully')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      resetForm()
      setIsSubmiting(false)
      router.push('/home')
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
          validationSchema={uploadVideoSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue, touched, setFieldTouched }) => (
            <View>
              <FormField
                title='Video Title'
                placeholder='Give your video a catch title...'
                otherStyles='mt-10'
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                error={errors.title}
                touched={touched.title}
              />

              <ThumbnailImageField
                image={values.thumbnail}
                error={errors.thumbnail}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                touched={touched.thumbnail}
              />

              <VideoUploadField
                video={values.video}
                error={errors.video}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                touched={touched.video}
              />

              <CustomButton
                title='Submit & Publish'
                handlePress={handleSubmit}
                disabled={isSubmiting}
                showLoader={isSubmiting}
                containerStyles='mt-7'
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UploadVideoForm