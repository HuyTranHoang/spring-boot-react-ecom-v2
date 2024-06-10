import { Button, IconButton, Paper, Typography } from '@mui/material'
import { indigo, pink } from '@mui/material/colors'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BasketType from '../../type/basket.type.ts'
import BasketItem from '../../type/basketItem.type.ts'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

const initBasket: BasketType = {
  id: 0,
  buyerId: '',
  basketItems: []
}

function Basket() {
  const [basket, setBasket] = useState<BasketType>(initBasket)
  const [modelOpen, setModelOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number>(0)

  const handleRemoveItem = async (productId: number) => {
    try {
      const res = await axios.delete(`/api/basket?productId=${productId}`)
      setBasket(res.data)
      setModelOpen(false)
      setDeleteId(0)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeQuantity = async (productId: number, quantity: number) => {
    try {
      if (quantity < 1) {
        setModelOpen(true)
        setDeleteId(productId)
        return
      }

      const res = await axios.put(`/api/basket?productId=${productId}&quantity=${quantity}`)
      setBasket(res.data)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalOpen = (deleteId: number) => {
    setModelOpen(true)
    setDeleteId(deleteId)
  }

  const handleModalClose = () => {
    setModelOpen(false)
    setDeleteId(0)
  }

  useEffect(() => {
    async function fetchBasket() {
      const res = await axios.get<BasketType>('/api/basket')
      const data = res.data
      setBasket(data)
    }

    fetchBasket()
  }, [])

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
                  <IconButton
                    sx={{ marginRight: 1 }}
                    onClick={() => handleChangeQuantity(row.productId, row.quantity - 1)}
                  >
                    <RemoveIcon color='primary' />
                  </IconButton>
                  {row.quantity}
                  <IconButton
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleChangeQuantity(row.productId, row.quantity + 1)}
                  >
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
                    ${(row.quantity * row.unitPrice).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <Button
                    variant='outlined'
                    size='small'
                    color='secondary'
                    startIcon={<DeleteIcon />}
                    onClick={() => handleModalOpen(row.productId)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {basket.basketItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  <Typography variant='h6' color='textSecondary'>
                    No items in the cart
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell colSpan={4} />
              <TableCell align='right' sx={{ fontWeight: 'bold', fontSize: 16 }}>
                Total
              </TableCell>
              <TableCell align='right' sx={{ fontWeight: 'bold', fontSize: 16 }}>
                ${basket.basketItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0).toFixed(2)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={modelOpen}
        onClose={handleModalClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to remove this item from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>No</Button>
          <Button onClick={() => handleRemoveItem(deleteId)} autoFocus variant='contained' color='secondary'>
            Remove it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Basket
