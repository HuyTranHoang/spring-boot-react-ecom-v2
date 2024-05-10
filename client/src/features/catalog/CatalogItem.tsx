import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import Product from '../../type/Product.ts'

type CatalogItemProps = {
  product: Product
}

function CatalogItem({product} : CatalogItemProps) {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={`/api/file/image/${product.imageUrl}`} />
        </ListItemAvatar>
        <ListItemText>
          {product.name} - ${product.unitPrice}
        </ListItemText>
      </ListItem>
      <Divider />
    </>
  )
}

export default CatalogItem
