import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Product from '../../type/product.type.ts'
import { IRootState } from '../../store/store.ts'

export const productAdapter = createEntityAdapter<Product>()

export const fetchProductThunk = createAsyncThunk<Product[]>('catalog/fetchProducts', async () => {
  try {
    const response = await axios.get('/api/products')
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const fetchProductByIdThunk = createAsyncThunk<Product, number>(
  'catalog/fetchProductById',
  async (productId) => {
    try {
      const response = await axios.get(`/api/products/${productId}`)
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
)

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productAdapter.getInitialState({
    status: 'idle',
    productLoad: false
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
      state.status = 'idle'
      state.productLoad = true
      productAdapter.setAll(state, action.payload)
    })
    builder.addCase(fetchProductThunk.rejected, (state) => {
      state.status = 'idle'
    })

    builder.addCase(fetchProductByIdThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
      state.status = 'idle'
      state.productLoad = true
      productAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(fetchProductByIdThunk.rejected, (state) => {
      state.status = 'idle'
    })
  }
})

export default catalogSlice.reducer
export const { selectAll: selectAllProducts } = productAdapter.getSelectors((state: IRootState) => state.catalog)
export const selectProductById = (state: IRootState, productId: number) => productAdapter.getSelectors().selectById(state.catalog, productId)

export const selectCatalogStatus = (state: IRootState) => state.catalog.status
