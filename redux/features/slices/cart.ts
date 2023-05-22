import { ProductType } from '@/types/product'
import { createSlice } from '@reduxjs/toolkit'
import { find } from 'lodash'
import { enqueueSnackbar } from 'notistack'
const initialState: Array<ProductType> = []
export const loadingSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, actions) => {
      const cart = {
        ...actions.payload
      }

      const existingProduct = find(state, { id: cart.id })
      if (existingProduct) {
        enqueueSnackbar('Bạn ơi! Giỏ hàng đã có rồi ạ :v', { variant: 'info' })
        return state
      } else {
        enqueueSnackbar('Đã thêm sản phẩm mới.', { variant: 'success' })
        return [...state, cart]
      }
    },
    resetCart: (state) => {
      state = []
      return state
    },
    updateCart: (state, actions) => {
      const cart = {
        ...actions.payload
      }
      const updatedState = state.map((product) => {
        if (product.id === cart.id) {
          return { ...product, quantity: cart.quantity }
        }
        return product
      })
      return updatedState
    }
  }
})

export const { updateCart, resetCart, addCart } = loadingSlice.actions

export default loadingSlice.reducer
