import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
  username: Yup.string().required('Required username').min(4, 'At least 4 characters'),
  email: Yup.string().required('Required email').email('Invalid email'),
  password: Yup.string().required('Required password').min(8, 'At least 8 characters'),
})