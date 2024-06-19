import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from '../../type/product.type.ts'
import { fetchProductById } from '../../services/apiProduct.ts'

function ProductDetails() {
  const {productId} = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return

    const id = parseInt(productId)

    fetchProductById(id).then((data) => {
      setProduct(data)
    })
  }, [productId]);


  if (!product)
    return <h3>Product not found</h3>

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <img
          src={`/api/file/image/${product?.imageUrl}`}
          alt={`${product?.name}`}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{mb: 2}} />
        <Typography variant="h4" color='secondary' sx={{mb:4}}>${product?.unitPrice.toFixed(2)}</Typography>
        <Divider sx={{mb: 2}} />
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
  );
}

export default ProductDetails
