import * as Yup from 'yup'

const MAX_FILE_SIZE = 50 * 1024 * 1024
const SUPPORTED_VIDEO_FORMATS = ['video/mp4']
const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

export const uploadVideoSchema = Yup.object().shape({
  title: Yup.string().required('Required title').min(4, 'At least 4 characters'),
  video: Yup.mixed()
    .test({
      name: 'video',
      test(value, ctx) {
        const { originalValue } = ctx

        if (value === originalValue) return true

        if (!value || !value.fileSize) {
          return ctx.createError({ message: 'Required video' })
        }

        if (value.fileSize > MAX_FILE_SIZE) {
          return ctx.createError({ message: 'Video size must be less than 50MB' })
        }

        if (!SUPPORTED_VIDEO_FORMATS.includes(value.mimeType)) {
          return ctx.createError({ message: 'Unsupported video format' })
        }
      }

    }),
  thumbnail: Yup.mixed()
    .test({
      name: 'thumbnail',
      test(value, ctx) {
        const { originalValue } = ctx

        if (value === originalValue) return true

        if (!value || !value.fileSize) {
          return ctx.createError({ message: 'Required thumbnail image' })
        }

        if (value.fileSize > MAX_FILE_SIZE) {
          return ctx.createError({ message: 'Image size must be less than 50MB' })
        }

        if (!SUPPORTED_IMAGE_FORMATS.includes(value.mimeType)) {
          return ctx.createError({ message: 'Unsupported image format' })
        }
      }

    })
})