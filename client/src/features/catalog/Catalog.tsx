import Product from '../../type/product.type.ts'
import { Divider, Grid, Typography } from '@mui/material'
import CatalogItem from './CatalogItem.tsx'
import { blue } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingComponent from '../../ui/LoadingComponent.tsx'

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get<Product[]>('/api/products/')
      const data = res.data
      setProducts(data)

      setLoading(false)
    }

    fetchProducts().catch(() => alert('Failed to fetch products'))
  }, [])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <>
      <Typography variant='h4' align='center' color={blue[600]}>
        - Catalog -
      </Typography>

      <Divider sx={{ borderColor: blue[300], my: 2 }} />

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
