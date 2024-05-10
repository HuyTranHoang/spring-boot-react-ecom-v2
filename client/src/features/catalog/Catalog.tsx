import Product from '../../type/Product.ts'
import { List } from '@mui/material'
import CatalogItem from './CatalogItem.tsx'

type CatalogProps = {
  products: Product[]
}

function Catalog({ products }: CatalogProps) {
  return (
    <List>
      {products.map((product) => <CatalogItem product={product} key={product.id} />)}
    </List>
  )
}

export default Catalog
