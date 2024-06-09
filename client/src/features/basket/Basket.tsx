import { Button, IconButton, Paper, Typography } from '@mui/material'
import { indigo, pink } from '@mui/material/colors'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BasketType from '../../type/basket.type.ts'
import LoadingComponent from '../../ui/LoadingComponent.tsx'
import BasketItem from '../../type/basketItem.type.ts'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete';

const initBasket: BasketType = {
  id: 0,
  buyerId: '',
  basketItems: []
}

function Basket() {
  const [basket, setBasket] = useState<BasketType>(initBasket)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBasket() {
      const res = await axios.get<BasketType>('/api/basket')
      const data = res.data
      setBasket(data)

      setLoading(false)
    }

    fetchBasket()
  }, [])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <>
      <Paper sx={{ backgroundColor: pink[500], marginBottom: 3 }}>
        <Typography paddingTop={3} variant='h4' align={'center'} height={100} color={'white'}>
          Cart items
        </Typography>
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align='right'>Product details</TableCell>
              <TableCell align='right' width={'15%'}>
                Quantity
              </TableCell>
              <TableCell align='right' width={'10%'}>
                Unit Price
              </TableCell>
              <TableCell align='right' width={'10%'}>
                Sub Total
              </TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.basketItems.map((row: BasketItem, index) => (
              <TableRow key={row.productId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row' sx={{ fontWeight: 'bold', fontSize: 16 }}>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <img
                    src={`/api/file/image/${row.imageUrl}`}
                    alt='image'
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h6'>{row.productName}</Typography>
                  <Typography variant='body2'>{row.categoryName}</Typography>
                  <Typography variant='body2'>{row.brand}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <IconButton sx={{ marginRight: 1 }}>
                    <RemoveIcon color='primary' />
                  </IconButton>
                  {row.quantity}
                  <IconButton sx={{ marginLeft: 1 }}>
                    <AddIcon color='primary' />
                  </IconButton>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2' fontWeight={'bold'} color={indigo[400]}>
                    ${row.unitPrice}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2' fontWeight={'bold'} color={indigo[600]}>
                    ${row.quantity * row.unitPrice}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Button variant='outlined' size='small' color='secondary' startIcon={<DeleteIcon />}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Basket
