import { createSlice } from '@reduxjs/toolkit'
const initialState: Array<{ id: string; quantity: number }> = []
export const loadingSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, actions) => {
      const cart = {
        id: actions.payload.id,
        quantity: actions.payload.quantity
      }
      const exisCart = state.find((e) => e.id === cart.id)

      // if (exisCart) {
      //     exisCart.quantity = cart.quantity
      // } else {
      state = [...state, cart]

      // }
      return state
    },
    resetCart: (state) => {
      state = []
      return state
    },
    setCart: (state) => {
      state = []
      return state
    }
  }
})

export const { setCart, resetCart, addCart } = loadingSlice.actions

export default loadingSlice.reducer
