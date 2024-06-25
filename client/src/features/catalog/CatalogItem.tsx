import { useSelector } from 'react-redux'
import { addBasketItemThunk, selectBasketStatus } from '../basket/basketSlice.ts'
import { Link } from 'react-router-dom'
import { deepPurple } from '@mui/material/colors'
import { Box, Button, CardActions, CardMedia, Typography, styled } from '@mui/material'
import Product from '../../type/product.type.ts'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { useAppDispatch } from '../../store/store.ts'

type CatalogItemProps = {
  product: Product
}

const TitleElipsis = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

const TypographyElipsis = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis'
})

function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useAppDispatch()
  const status = useSelector(selectBasketStatus)

  const handleAddItem = async (productId: number) => {
    if (status === 'idle') {
      dispatch(addBasketItemThunk(productId))
    }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <TitleElipsis sx={{ minHeight: 64 }} variant='h5'>
          {product.name}
        </TitleElipsis>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {product.categoryName}
        </Typography>
        <CardMedia sx={{ height: 360, objectFit: 'cover' }} image={`/api/file/image/${product.imageUrl}`} />
        <TypographyElipsis sx={{ mt: 1.5 }} variant='body2'>
          {product.description}
        </TypographyElipsis>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography fontWeight='bold' color={deepPurple[500]} variant='body2'>
            ${product.unitPrice}
          </Typography>
          <Typography variant='body2'>In Stock: {product.unitInStock}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='outlined' size='small' component={Link} to={`/catalog/${product.id}`}>
          Details
        </Button>
        <Button
          variant='outlined'
          size='small'
          disabled={status === 'loading'}
          onClick={() => handleAddItem(product.id)}
        >
          {status === 'loading' ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CatalogItem
