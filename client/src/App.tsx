import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './type/Product.ts'
import { Container, Typography } from '@mui/material'
import Catalog from './features/catalog/Catalog.tsx'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get<Product[]>('/api/products/')
      const data = res.data
      setProducts(data)
    }

    fetchProducts().catch(console.error)
  }, [])

  return (
    <Container>
      <Typography variant="h2">My Shop</Typography>
      <Catalog products={products} />
    </Container>
  )
}

export default App
