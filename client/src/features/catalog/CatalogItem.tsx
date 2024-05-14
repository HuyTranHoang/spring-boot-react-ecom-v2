import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import Product from '../../type/product.type.ts'

type CatalogItemProps = {
  product: Product
}

function CatalogItem({ product }: CatalogItemProps) {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={`/api/file/image/${product.imageUrl}`} />
        </ListItemAvatar>
        <ListItemText>
          {product.name} - ${product.unitPrice} - {product.categoryName}
        </ListItemText>
      </ListItem>
    </>
  )
}

export default CatalogItem
