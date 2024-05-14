import axios from 'axios'
import Product from '../type/product.type'

async function fetchProducts() {
  const res = await axios.get<Product[]>('/api/products/')
  const data = res.data
  return data
}

export { fetchProducts }
