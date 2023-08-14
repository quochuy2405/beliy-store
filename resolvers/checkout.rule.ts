import { OrderForm } from '@/pages/checkout/index.vue'
import { helpers, required } from '@vuelidate/validators'

export const rules = (formData: OrderForm) =>
    computed(() => {
        return {
            name: {
                required: helpers.withMessage('Hãy điền  họ và tên.', required),
            },
            ward: {
                required: helpers.withMessage('Hãy chọn phường/xã.', () => {
                    return !!formData.ward.value
                }),
            },
            subAddress: {
                required: helpers.withMessage(
                    'Nếu không có số nhà, hãy nhập mô tả vị trí mà bạn biết.',
                    required,
                ),
            },
            district: {
                required: helpers.withMessage('Hãy chọn quận/huyện.', () => {
                    return !!formData.district.value
                }),
            },
            province: {
                required: helpers.withMessage(
                    'Hãy chọn tỉnh/thành phố.',
                    () => {
                        return !!formData.province.value
                    },
                ),
            },
            phone: {
                required: helpers.withMessage(
                    'Hãy điền số điện thoại.',
                    required,
                ),
                sameAs: helpers.withMessage(
                    'Số điện thoại không hợp lệ.',
                    () => {
                        const reg =
                            /((84|0[3|5|7|8|9])+([0-9]{8})\b)|(1[8|9]00)+([0-9]{4}\b)/g
                        return !!reg.test(formData.phone.toString())
                    },
                ),
            },
        }
    })
