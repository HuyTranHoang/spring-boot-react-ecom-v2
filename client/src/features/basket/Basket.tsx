import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectBasket, removeBasketItemThunk, updateItem, selectBasketStatus } from './basketSlice.ts'
import { updateBasketItem } from '../../services/apiBasket.ts'
import { indigo, pink } from '@mui/material/colors'
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import RemoveIcon from '@mui/icons-material/Remove'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import DeleteIcon from '@mui/icons-material/Delete'
import BasketItem from '../../type/basketItem.type.ts'
import AddIcon from '@mui/icons-material/Add'
import { useAppDispatch } from '../../store/store.ts'
import BasketSummary from './BasketSummary.tsx'
import { Link } from 'react-router-dom'

function Basket() {
  const basket = useSelector(selectBasket)
  const status = useSelector(selectBasketStatus)
  const dispatch = useAppDispatch()
  const [modelOpen, setModelOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number>(0)

  const handleRemoveItem = async (productId: number) => {
    dispatch(removeBasketItemThunk(productId))
    setModelOpen(false)
  }

  const handleChangeQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      setModelOpen(true)
      setDeleteId(productId)
      return
    }

    updateBasketItem(productId, quantity).then(() => {
      dispatch(updateItem({ productId, quantity }))
    })
  }

  const handleModalOpen = (deleteId: number) => {
    setModelOpen(true)
    setDeleteId(deleteId)
  }

  const handleModalClose = () => {
    setModelOpen(false)
    setDeleteId(0)
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
            {basket &&
              basket.basketItems.map((row: BasketItem, index) => (
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
                      {status === 'loading' && row.productId === deleteId ? 'Removing...' : 'Remove'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

            {basket && basket.basketItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  <Typography variant='h6' color='textSecondary'>
                    No items in the cart
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {basket && (
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
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {basket && basket.basketItems.length > 0 && (
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <BasketSummary />
            <Button component={Link} to='/checkout' variant='contained' size='large' fullWidth>
              Checkout
            </Button>
          </Grid>
        </Grid>
      )}

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
