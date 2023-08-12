import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            products: [],
        }
    },
})

interface IToast {
    isShow: boolean
    content: string
    status: 'info' | 'success' | 'error' | 'warning'
}
export const useToast = defineStore('toast', {
    // arrow function recommended for full type inference
    state: (): IToast => {
        return {
            isShow: false,
            content: '',
            status: 'info',
        }
    },
})
