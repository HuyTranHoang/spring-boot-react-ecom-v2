import axios from 'axios'
import Product from '../type/product.type'

async function fetchProducts() {
  try {
    const res = await axios.get<Product[]>('/api/products/')
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch products')
  }
}

async function fetchProductById(id: number) {
  try {
    const res = await axios.get<Product>(`/api/products/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch product')
  }
}

export { fetchProducts, fetchProductById }
