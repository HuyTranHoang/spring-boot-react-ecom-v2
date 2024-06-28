import { useEffect } from 'react'
import { pink } from '@mui/material/colors'
import { Grid, Paper, Typography } from '@mui/material'
import LoadingComponent from '../../ui/LoadingComponent.tsx'
import CatalogItem from './CatalogItem.tsx'
import { IRootState, useAppDispatch } from '../../store/store.ts'
import {
  fetchBrandAndCategoryForFilterThunk,
  fetchProductThunk,
  selectAllProducts,
  selectCatalogStatus,
} from './catalogSlice.ts'
import { useSelector } from 'react-redux'

function Catalog() {
  const dispatch = useAppDispatch()
  const products = useSelector(selectAllProducts)

  const { productLoaded, filtersLoaded , brands, categories} = useSelector((state: IRootState) => state.catalog)

  const status = useSelector(selectCatalogStatus)

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductThunk())

    if (!filtersLoaded) dispatch(fetchBrandAndCategoryForFilterThunk())
  }, [dispatch, filtersLoaded, productLoaded])

  if (status === 'loading') {
    return <LoadingComponent />
  }

  return (
    <>
      <Paper sx={{ backgroundColor: pink[300], marginBottom: 3 }}>
        <Typography paddingTop={3} variant='h4' align={'center'} height={100} color={'white'}>
          Catalog
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {brands}

        {categories}

        {products.map((product) => (
          <Grid item xs={3} key={product.id}>
            <CatalogItem product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Catalog
