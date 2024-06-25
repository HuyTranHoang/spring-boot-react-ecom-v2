import Basket from '../../type/basket.type.ts'
import { createSlice } from '@reduxjs/toolkit'
import { IRootState } from '../../store/store.ts'

interface BasketSlice {
  basket: Basket
  status: 'idle' | 'loading' | 'failed'
}

const initialState: BasketSlice = {
  basket: {
    id: 0,
    buyerId: '',
    basketItems: []
  },
  status: 'idle'
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload
    },
    removeItem: (state, action) => {
      state.basket.basketItems = state.basket.basketItems.filter((item) => item.productId !== action.payload)
    },
    updateItem: (state, action) => {
      const itemIndex = state.basket.basketItems.findIndex((item) => item.productId === action.payload.productId)
      if (itemIndex > -1) {
        state.basket.basketItems[itemIndex].quantity = action.payload.quantity
      }
    },
    clearBasket: (state) => {
      state.basket.basketItems = []
    }
  }
})

export const { setBasket, removeItem, updateItem, clearBasket } = basketSlice.actions
export default basketSlice.reducer

export const selectBasket = (state: IRootState) => state.basket.basket
