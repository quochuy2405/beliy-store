import * as yup from 'yup'
export const schemaRegister = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: yup.string().min(8, 'Mật khẩu phải ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    .required('Vui lòng nhập mật khẩu xác nhận')
})
