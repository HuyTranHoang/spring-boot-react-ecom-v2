import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Product from '../../type/product.type.ts'
import { IRootState } from '../../store/store.ts'


interface entityAdapterState {
  status: 'idle' | 'loading' | 'failed'
  productLoaded: boolean
  brands: string[]
  categories: string[]
  filtersLoaded: boolean
}

const initialState: entityAdapterState = {
  status: 'idle',
  productLoaded: false,
  brands: [],
  categories: [],
  filtersLoaded: false
}

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

export const fetchBrandAndCategoryForFilterThunk = createAsyncThunk<{ brands: string[]; categories: string[] }>(
  'catalog/fetchBrandsAndCategoriesForFilter',
  async () => {
    try {
      const response = await axios.get('/api/products/get-filter-options')
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
)

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: productAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
      state.status = 'idle'
      state.productLoaded = true
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
      state.productLoaded = true
      productAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(fetchProductByIdThunk.rejected, (state) => {
      state.status = 'idle'
    })

    builder.addCase(fetchBrandAndCategoryForFilterThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchBrandAndCategoryForFilterThunk.fulfilled, (state, action) => {
      state.status = 'idle'
      state.filtersLoaded = true
      state.brands = action.payload.brands
      state.categories = action.payload.categories
    })
    builder.addCase(fetchBrandAndCategoryForFilterThunk.rejected, (state) => {
      state.status = 'idle'
    })
  }
})

export default catalogSlice.reducer
export const { selectAll: selectAllProducts } = productAdapter.getSelectors((state: IRootState) => state.catalog)
export const selectProductById = (state: IRootState, productId: number) =>
  productAdapter.getSelectors().selectById(state.catalog, productId)
export const selectBrands = (state: IRootState) => state.catalog.brands
export const selectCategories = (state: IRootState) => state.catalog.categories

export const selectCatalogStatus = (state: IRootState) => state.catalog.status
