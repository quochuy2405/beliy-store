import { OrderForm } from '@/pages/checkout.vue'

export const rules = (formData: OrderForm) =>
    computed(() => {
        console.log(formData)
        return {
            // awards: {
            //     required: helpers.withMessage(
            //         'The email field is required',
            //         required,
            //     ),
            //     email: helpers.withMessage('Invalid email format', email),
            // },
            // country: {
            //     required: helpers.withMessage(
            //         'The password field is required',
            //         required,
            //     ),
            //     minLength: minLength(6),
            // },
        }
    })
