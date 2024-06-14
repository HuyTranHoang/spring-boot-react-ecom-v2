import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Product from '../../type/product.type.ts'
import { Box, Button, CardActions, CardMedia, Typography, styled } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { deepPurple } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { useBaskets } from '../../context/BasketContext.tsx'

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
  const { setBasket } = useBaskets()
  const [loading, setLoading] = useState(false)

  const handleAddItem = async (productId: number) => {
    setLoading(true)
    try {
      const res = await axios.post(`/api/basket?productId=${productId}&quantity=1`, {})
      setBasket(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
        <Button variant='outlined' size='small' disabled={loading} onClick={() => handleAddItem(product.id)}>
          {loading ? 'Adding...' : 'Add to cart'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default CatalogItem
