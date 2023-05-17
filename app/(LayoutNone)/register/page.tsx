'use client'
import { Register } from '@/components/templates'
import { registerSchema } from '@/utils/register'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
const RegisterPage = () => {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(registerSchema)
  })

  const handleSubmit = (data) => {
    console.log(data)
  }
  const props = {
    methods,
    handleSubmit
  }
  return <Register {...props} />
}

export default RegisterPage
