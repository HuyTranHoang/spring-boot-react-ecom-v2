import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Product from '../../type/product.type.ts'
import { Box, Button, CardActions, CardMedia, Typography, styled } from '@mui/material'

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
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <TitleElipsis variant='h5'>{product.name}</TitleElipsis>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {product.categoryName}
        </Typography>
        <CardMedia sx={{ height: 240, objectFit: 'cover' }} image={`/api/file/image/${product.imageUrl}`} />
        <TypographyElipsis variant='body2'>{product.description}</TypographyElipsis>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant='body2'>${product.unitPrice}</Typography>
          <Typography variant='body2'>In Stock: {product.unitInStock}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default CatalogItem
