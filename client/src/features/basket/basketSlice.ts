import Basket from '../../type/basket.type.ts'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IRootState } from '../../store/store.ts'
import axios from 'axios'

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

const addBasketItemThunk = createAsyncThunk<Basket, number>(
  'basket/addBasketItem',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.post(`/api/basket?productId=${productId}&quantity=1`, {})
      return res.data
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue('Failed to add item')
    }
  }
)

const removeBasketItemThunk = createAsyncThunk<Basket, number>(
  'basket/removeBasketItem',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/basket?productId=${productId}`)
      return res.data
    } catch (error) {
      console.error(error)
      return thunkAPI.rejectWithValue('Failed to remove item')
    }
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBasketItemThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addBasketItemThunk.fulfilled, (state, action) => {
        state.basket = action.payload
        state.status = 'idle'
      })
      .addCase(addBasketItemThunk.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(removeBasketItemThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeBasketItemThunk.fulfilled, (state, action) => {
        state.basket = action.payload
        state.status = 'idle'
      })
      .addCase(removeBasketItemThunk.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export { addBasketItemThunk, removeBasketItemThunk }
export const { setBasket, removeItem, updateItem, clearBasket } = basketSlice.actions
export default basketSlice.reducer

export const selectBasket = (state: IRootState) => state.basket.basket
export const selectBasketStatus = (state: IRootState) => state.basket.status