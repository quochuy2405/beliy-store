import { RegisterForm } from '@/pages/register.vue'
import { email, helpers, minLength, required } from '@vuelidate/validators'

export const rules = (formData: RegisterForm) =>
    computed(() => {
        return {
            email: {
                required: helpers.withMessage(
                    'The email field is required',
                    required,
                ),
                email: helpers.withMessage('Invalid email format', email),
            },
            password: {
                required: helpers.withMessage(
                    'The password field is required',
                    required,
                ),
                minLength: minLength(6),
            },
            confirmPassword: {
                required: helpers.withMessage(
                    'The password confirmation field is required',
                    required,
                ),
                sameAs: helpers.withMessage(
                    "Passwords don't match",
                    () => formData.password === formData.confirmPassword,
                ),
            },
        }
    })
