import Product from '../../type/product.type.ts'
import { Divider, Grid, List, Typography } from '@mui/material'
import CatalogItem from './CatalogItem.tsx'
import { blue } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get<Product[]>('/api/products/')
      const data = res.data
      setProducts(data)
    }

    fetchProducts().catch(() => alert('Failed to fetch products'))
  }, [])

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
