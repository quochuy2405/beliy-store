import { OrderForm } from '@/pages/checkout.vue'
import { helpers, required } from '@vuelidate/validators'

export const rules = (formData: OrderForm) =>
    computed(() => {
        return {
            name: {
                required: helpers.withMessage('Hãy điền  họ và tên', required),
            },
            phone: {
                required: helpers.withMessage(
                    'Hãy điền số điện thoại',
                    required,
                ),
                sameAs: helpers.withMessage(
                    'Số điện thoại không hợp lệ',
                    () => {
                        const reg =
                            /((84|0[3|5|7|8|9])+([0-9]{8})\b)|(1[8|9]00)+([0-9]{4}\b)/g
                        return !!reg.test(formData.phone.toString())
                    },
                ),
            },
        }
    })
