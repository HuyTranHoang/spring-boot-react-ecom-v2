import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { fetchProductByIdThunk, selectProductById } from './catalogSlice.ts'
import { IRootState, useAppDispatch } from '../../store/store.ts'
import Product from '../../type/product.type.ts'
import { useSelector } from 'react-redux'

function ProductDetails() {
  const { productId } = useParams()
  const product: Product = useSelector((state: IRootState) => selectProductById(state, parseInt(productId!)))
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productId) return
    const id = parseInt(productId)
    dispatch(fetchProductByIdThunk(id))
  }, [productId])

  if (!product) return <h3>Product not found</h3>

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <img src={`/api/file/image/${product?.imageUrl}`} alt={`${product?.name}`} />
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h3'>{product?.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='h4' color='secondary' sx={{ mb: 4 }}>
          ${product?.unitPrice.toFixed(2)}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product?.categoryName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>{product?.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product?.unitInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default ProductDetails
