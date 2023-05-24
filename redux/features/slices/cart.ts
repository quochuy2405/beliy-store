import { ProductType } from '@/types/product'
import { createSlice } from '@reduxjs/toolkit'
import { find, isEqual, sortBy } from 'lodash'
import { enqueueSnackbar } from 'notistack'
const initialState: Array<ProductType> = JSON.parse(window.localStorage.getItem('orders')) || []
export const loadingSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, actions) => {
      const cart = {
        ...actions.payload
      }

      const existingProduct = find(state, { id: cart.id, sizes: cart.sizes })
      if (existingProduct) {
        enqueueSnackbar('Bạn ơi! Giỏ hàng đã có rồi ạ :v', { variant: 'info' })
        return state
      } else {
        enqueueSnackbar('Đã thêm sản phẩm mới.', { variant: 'success' })
        window.localStorage.setItem('orders', JSON.stringify([...state, cart]))
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
        if (product.id === cart.id && isEqual(sortBy(product.sizes), sortBy(cart.sizes))) {
          return { id: product.id, ...cart }
        }
        return product
      })
      window.localStorage.setItem('orders', JSON.stringify([...updatedState]))
      return updatedState
    },
    removeInCart: (state, actions) => {
      const cart = {
        ...actions.payload
      }
      const updatedState = state.filter(
        (product) => !(product.id === cart.id && isEqual(sortBy(product.sizes), sortBy(cart.sizes)))
      )
      window.localStorage.setItem('orders', JSON.stringify([...updatedState]))
      return updatedState
    }
  }
})

export const { updateCart, resetCart, addCart } = loadingSlice.actions

export default loadingSlice.reducer
