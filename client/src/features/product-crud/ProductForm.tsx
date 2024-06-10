import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Category from '../../type/category.type'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import SendIcon from '@mui/icons-material/Send'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { green } from '@mui/material/colors'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  unitPrice: yup.number().typeError('Unit price must be number').required('Unit price is required').positive(),
  unitInStock: yup
    .number()
    .typeError('Unit in stock must be number')
    .required('Unit in stock is required')
    .integer()
    .positive(),
  brand: yup.string().required('Brand is required'),
  categoryId: yup.string().required('Category is required')
})

type FormFields = {
  name: string
  description: string
  unitPrice: number
  unitInStock: number
  brand: string
  categoryId: string
}

function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    resolver: yupResolver(schema)
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
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

    try {
      await axios.post('/api/products/', formData, config)
      toast.success('Product created successfully')
      reset()
      setImage({ preview: '', raw: '' })
    } catch (error) {
      toast.error('Failed to create product')
    }
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
    <>
      <Paper sx={{backgroundColor: green[300], marginBottom: 3}}>
        <Typography paddingTop={3} variant='h4' align={'center'} height={100} color={'white'}>
          Add product
        </Typography>
      </Paper>

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
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Description'
                error={!!errors.description}
                helperText={errors.description?.message}
                {...register('description')}
              />
            </Grid>

            <Grid container item xs={6} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Unit price'
                  error={!!errors.unitPrice}
                  helperText={errors.unitPrice?.message}
                  {...register('unitPrice')}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Unit In Stock'
                  error={!!errors.unitInStock}
                  helperText={errors.unitInStock?.message}
                  {...register('unitInStock')}
                />
              </Grid>
            </Grid>

            <Grid container item xs={6} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Brand'
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                  {...register('brand')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Category Name'
                  select
                  error={!!errors.categoryId}
                  helperText={errors.categoryId?.message}
                  {...register('categoryId')}
                  defaultValue={''}
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
                <Button fullWidth variant='contained' color='secondary' component='span' endIcon={<FileUploadIcon />}>
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
            <Button disabled={isSubmitting} variant='contained' disableRipple type='submit' endIcon={<SendIcon />}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default ProductForm
