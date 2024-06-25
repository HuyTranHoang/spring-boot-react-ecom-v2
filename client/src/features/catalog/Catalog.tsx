import { useEffect, useState } from 'react'
import { pink } from '@mui/material/colors'
import { Grid, Paper, Typography } from '@mui/material'
import { fetchProducts } from '../../services/apiProduct.ts'
import Product from '../../type/product.type.ts'
import LoadingComponent from '../../ui/LoadingComponent.tsx'
import CatalogItem from './CatalogItem.tsx'

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <>
      <Paper sx={{backgroundColor: pink[300], marginBottom: 3}}>
        <Typography paddingTop={3} variant='h4' align={'center'} height={100} color={'white'}>
          Catalog
        </Typography>
      </Paper>

      <Grid container spacing={2}>
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
