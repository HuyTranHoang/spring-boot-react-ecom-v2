import { useEffect } from 'react'
import { Grid } from '@mui/material'
import LoadingComponent from '../../ui/LoadingComponent.tsx'
import CatalogItem from './CatalogItem.tsx'
import { IRootState, useAppDispatch } from '../../store/store.ts'
import {
  fetchBrandAndCategoryForFilterThunk,
  fetchProductThunk,
  selectAllProducts,
  selectCatalogStatus,
  setProductParams
} from './catalogSlice.ts'
import { useSelector } from 'react-redux'
import CatalogFilter from './CatalogFilter.tsx'
import PaginationComponent from '../../ui/PaginationComponent.tsx'

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceAsc', label: 'Price - Low to High' },
  { value: 'priceDesc', label: 'Price - High to Low' }
]

function Catalog() {
  const dispatch = useAppDispatch()
  const products = useSelector(selectAllProducts)

  const { productLoaded, filtersLoaded, brands, categories, productParams, pagination } = useSelector(
    (state: IRootState) => state.catalog
  )

  const status = useSelector(selectCatalogStatus)

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductThunk())
  }, [dispatch, productLoaded])

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchBrandAndCategoryForFilterThunk())
  }, [dispatch, filtersLoaded])

  if (status === 'loading' && !filtersLoaded) {
    return <LoadingComponent />
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <CatalogFilter
          brands={brands}
          categories={categories}
          sortOptions={sortOptions}
          productParams={productParams}
        />
      </Grid>

      <Grid container spacing={3} item xs={9}>
        {products.map((product) => (
          <Grid item xs={4} key={product.id}>
            <CatalogItem product={product} />
          </Grid>
        ))}
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9}>
        <PaginationComponent
          pagination={pagination}
          onPageChange={(page: number) => dispatch(setProductParams({ pageNumber: page }))}
        />
      </Grid>
    </Grid>
  )
}

export default Catalog
