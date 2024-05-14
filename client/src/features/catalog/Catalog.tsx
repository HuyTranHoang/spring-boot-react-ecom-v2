import Product from '../../type/product.type.ts'
import { Divider, List, Typography } from '@mui/material'
import CatalogItem from './CatalogItem.tsx'
import ProductForm from '../product-crud/ProductForm.tsx'
import { blue } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Category from '../../type/category.type.ts'

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get<Product[]>('/api/products/')
      const data = res.data
      setProducts(data)
    }

    fetchProducts().catch(() => alert('Failed to fetch products'))
  }, [])

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get<Category[]>('/api/categories/')
      const data = res.data
      setCategories(data)
    }

    fetchCategories().catch(() => alert('Failed to fetch products'))
  }, [])

  return (
    <>
      <ProductForm categories={categories} />
      <Divider sx={{ borderColor: blue[300], my: 2 }} />
      <Typography variant='h4' align='center' color={blue[600]}>
        - Catalog -
      </Typography>
      <List>
        {products.map((product) => (
          <CatalogItem product={product} key={product.id} />
        ))}
      </List>
    </>
  )
}

export default Catalog
