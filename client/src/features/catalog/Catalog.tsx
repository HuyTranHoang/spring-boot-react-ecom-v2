import Product from '../type/Product.ts'

type CatalogProps = {
  product: Product
}

function Catalog({ product }: CatalogProps) {
  return (
    <>
      <div>{product.name} - {product.categoryName} - {product.unitPrice}</div>
      <hr />
    </>
  )
}

export default Catalog
