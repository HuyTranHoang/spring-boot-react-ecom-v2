import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from './features/type/Product.ts'
import Catalog from './features/catalog/Catalog.tsx'
import BasicNavBar from './ui/BasicNavBar.tsx'
import Container from 'react-bootstrap/Container'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get<Product[]>('/api/products/')
        const data = res.data
        setProducts(data)
      } catch (err) {
        alert('Failed to fetch products')
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <BasicNavBar />
      <Container>
        {products.map((product) => <Catalog key={product.id} product={product} />)}
      </Container>
    </>
  )
}

export default App
