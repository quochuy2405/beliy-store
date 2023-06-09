'use client'
import { Login } from '@/components/templates'
import { findAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import { DefaultLayout } from '@/layouts/Layouts'
import { setUser } from '@/redux/features/slices/user'
import { loginSchema } from '@/utils/login'
import { collection } from '@firebase/firestore'
import { yupResolver } from '@hookform/resolvers/yup'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  })

  const handleSubmit = async (data) => {
    const db_users = collection(db, 'account_users')
    const user = (await findAll(db_users, [
      ['email', data.email],
      ['password', data.password]
    ])) as any
    if (user[0] && user[0].id) {
      setCookie('user', JSON.stringify({ id: user[0].id, email: user[0].email }))
      dispatch(setUser({ id: user[0].id, email: user[0].email }))
      router.push('/')
    } else {
      enqueueSnackbar('Đăng nhập thất bại', { variant: 'error' })
    }
  }
  const props = {
    methods,
    handleSubmit
  }
  return <Login {...props} />
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
export default LoginPage
