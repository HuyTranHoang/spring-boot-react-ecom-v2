import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Category from '../../type/category.type'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

type FormFields = {
  name: string
  description: string
  unitPrice: number
  unitInStock: number
  brand: string
  categoryId: string
  image: File | string
}

function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>({
    defaultValues: {
      categoryId: ''
    }
  })

  const [image, setImage] = useState({ preview: '', raw: '' as File | string })
  const [categories, setCategories] = useState<Category[]>([])

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    setImage({
      preview: URL.createObjectURL(event.target.files[0]),
      raw: event.target.files[0]
    })
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('unitPrice', data.unitPrice.toString())
    formData.append('unitInStock', data.unitInStock.toString())
    formData.append('brand', data.brand)
    formData.append('categoryId', data.categoryId)
    formData.append('image', image.raw)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
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
  }

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get<Category[]>('/api/categories/')
      const data = res.data
      setCategories(data)
    }

    fetchCategories().catch(() => alert('Failed to fetch products'))
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container columnSpacing={6} rowSpacing={2}>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>Product Form</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Name'
              {...register('name', {
                required: 'Name is required'
              })}
            />
            {errors.name && <Typography color='error'>{errors.name.message}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label='Description' {...register('description')} />
          </Grid>

          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Unit Price'
                type='number'
                {...register('unitPrice', {
                  required: 'Unit Price is required',
                  min: {
                    value: 5,
                    message: 'Unit Price must be more than 5'
                  }
                })}
              />
              {errors.unitPrice && <Typography color='error'>{errors.unitPrice.message}</Typography>}
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label='Unit In Stock' type='number' {...register('unitInStock')} />
            </Grid>
          </Grid>

          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label='Brand' {...register('brand')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Category Name' select {...register('categoryId')} defaultValue={''}>
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
