import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Product, { ProductParams } from '../../type/product.type.ts'
import { IRootState } from '../../store/store.ts'
import { PaginationResponse } from '../../type/pagination.type.ts'

interface fetchProductResponse {
  data: Product[]
  pageInfo: PaginationResponse
}

interface entityAdapterState {
  status: 'idle' | 'loading' | 'failed'
  productLoaded: boolean
  brands: string[]
  categories: string[]
  filtersLoaded: boolean
  productParams: ProductParams
  pagination: PaginationResponse
}

const initialState: entityAdapterState = {
  status: 'idle',
  productLoaded: false,
  brands: [],
  categories: [],
  filtersLoaded: false,
  productParams: {
    sort: 'name',
    pageNumber: 1,
    pageSize: 6
  },
  pagination: {
    number: 0,
    totalElements: 0,
    totalPages: 0,
    size: 0
  }
}

export const productAdapter = createEntityAdapter<Product>()

export const fetchProductThunk = createAsyncThunk<fetchProductResponse>('catalog/fetchProducts', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as IRootState

    const params = new URLSearchParams()

    params.append('pageNumber', (state.catalog.productParams.pageNumber - 1).toString())
    params.append('pageSize', state.catalog.productParams.pageSize.toString())
    params.append('sort', state.catalog.productParams.sort)

    if (state.catalog.productParams.name) {
      params.append('name', state.catalog.productParams.name)
    }
    if (state.catalog.productParams.categoryName) {
      params.append('categoryName', state.catalog.productParams.categoryName.toString())
    }
    if (state.catalog.productParams.brand) {
      params.append('brand', state.catalog.productParams.brand.toString())
    }

    const response = await axios.get('/api/products/search', { params: params })
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
  initialState: productAdapter.getInitialState<entityAdapterState>(initialState),
  reducers: {
    setProductParams: (state, action) => {
      state.productLoaded = false
      state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 }
    },
    setPageNumber: (state, action) => {
      state.productLoaded = false
      state.productParams.pageNumber = action.payload
    },
    resetProductParams: (state) => {
      state.productLoaded = false
      state.productParams = initialState.productParams
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductThunk.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
      state.status = 'idle'
      state.productLoaded = true
      productAdapter.setAll(state, action.payload.data)
      state.pagination = action.payload.pageInfo
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
export const { setProductParams, resetProductParams, setPageNumber } = catalogSlice.actions
export const { selectAll: selectAllProducts } = productAdapter.getSelectors((state: IRootState) => state.catalog)
export const selectProductById = (state: IRootState, productId: number) =>
  productAdapter.getSelectors().selectById(state.catalog, productId)
export const selectBrands = (state: IRootState) => state.catalog.brands
export const selectCategories = (state: IRootState) => state.catalog.categories
export const selectProductParams = (state: IRootState) => state.catalog.productParams
export const selectCatalogStatus = (state: IRootState) => state.catalog.status
