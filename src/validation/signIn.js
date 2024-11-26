import * as Yup from 'yup'

export const signInSchema = Yup.object().shape({
  email: Yup.string().required('Required email').email('Invalid email'),
  password: Yup.string().required('Required password').min(8, 'At least 8 characters'),
})