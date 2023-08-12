import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            products: [],
        }
    },
})

export interface IToast {
    isShow: boolean | 'clear'
    content: string
    status: 'info' | 'success' | 'error' | 'warning'
    vertical: 'left' | 'center' | 'right'
    horizontal: 'top' | 'center' | 'bottom'
}
export const initToastValue: IToast = {
    isShow: 'clear',
    content: null,
    status: 'info',
    vertical: 'center',
    horizontal: 'bottom',
}
export const useToast = defineStore('toast', {
    // arrow function recommended for full type inference
    state: (): IToast => initToastValue,
})
