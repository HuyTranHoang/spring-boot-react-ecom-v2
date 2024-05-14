import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Category from '../../type/category.type'
import axios from 'axios'
import Product from '../../type/product.type'

type ProductFormProps = {
  categories: Category[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  products: Product[]
}

function ProductForm({ categories, setProducts, products }: ProductFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [unitPrice, setUnitPrice] = useState(0)
  const [unitInStock, setUnitInStock] = useState(0)
  const [brand, setBrand] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState({ preview: '', raw: '' as File | string })

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    setImage({
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0]
    })
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('unitPrice', String(unitPrice))
    formData.append('unitInStock', String(unitInStock))
    formData.append('brand', brand)
    formData.append('categoryId', categoryId)
    formData.append('image', image.raw)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios
      .post('/api/products/', formData, config)
      .then(() => {
        alert('Product created successfully')
      })
      .catch(() => {
        alert('Failed to create product')
      })

    setName('')
    setDescription('')
    setUnitPrice(0)
    setUnitInStock(0)
    setBrand('')
    setCategoryId('')
    setImage({ preview: '', raw: '' })

    const newProduct: Product = {
      id: products.length + 1,
      name,
      description,
      unitPrice,
      imageUrl: image.preview,
      unitInStock,
      brand,
      categoryId: Number(categoryId),
      categoryName: categories.find((category) => category.id === Number(categoryId))?.categoryName || ''
    }

    setProducts([...products, newProduct])
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container columnSpacing={6} rowSpacing={2}>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Product Form</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label='Name' value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Unit Price'
                type='number'
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Unit In Stock'
                type='number'
                value={unitInStock}
                onChange={(e) => setUnitInStock(Number(e.target.value))}
              />
            </Grid>
          </Grid>

          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label='Brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Category Name'
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                select
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor='contained-button-file'>
              <Button variant='contained' color='secondary' component='span'>
                Upload Image
              </Button>
            </label>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5'>Preview Image</Typography>
          {image.preview && <img src={image.preview} alt='Preview' width='100%' />}
        </Grid>

        <Grid item xs={12}>
          <Button variant='contained' disableRipple type='submit'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProductForm
