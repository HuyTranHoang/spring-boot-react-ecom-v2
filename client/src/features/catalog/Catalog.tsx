import { useEffect } from 'react'
import { Box, Grid, Pagination, Typography } from '@mui/material'
import LoadingComponent from '../../ui/LoadingComponent.tsx'
import CatalogItem from './CatalogItem.tsx'
import { IRootState, useAppDispatch } from '../../store/store.ts'
import {
  fetchBrandAndCategoryForFilterThunk,
  fetchProductThunk,
  selectAllProducts,
  selectCatalogStatus
} from './catalogSlice.ts'
import { useSelector } from 'react-redux'
import CatalogFilter from './CatalogFilter.tsx'

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceAsc', label: 'Price - Low to High' },
  { value: 'priceDesc', label: 'Price - High to Low' }
]

function Catalog() {
  const dispatch = useAppDispatch()
  const products = useSelector(selectAllProducts)

  const { productLoaded, filtersLoaded, brands, categories, productParams } = useSelector(
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
        <Box display='flex' justifyContent='space-between' alignContent='content'>
          <Typography>Display 1-6 of 20 items</Typography>
          <Pagination color='primary' count={10} page={2} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Catalog
