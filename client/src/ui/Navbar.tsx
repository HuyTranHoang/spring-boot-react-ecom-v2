import StorefrontIcon from '@mui/icons-material/Storefront'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Badge, Box, Button, IconButton, Theme, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCookie } from '../utils/util.ts'
import { setBasketItems, setBuyerId } from '../features/basket/basketSlice.ts'
import { fetchBasket } from '../services/apiBasket.ts'

type NavbarProps = {
  colorMode: { toggleColorMode: () => void }
  theme: Theme
}

const navLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  marginRight: '1rem'
}

function Navbar({ colorMode, theme }: NavbarProps) {
  // const {basket} = useBaskets()

  const itemInCart = useSelector((state) => state.basket.basketItems.length)
  const dispatch = useDispatch()

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    console.log('buyer id > ', buyerId)
    if (buyerId) {
      fetchBasket().then((data) => {
        dispatch(setBasketItems(data.basketItems))
        dispatch(setBuyerId(buyerId))
      })
    }
  }, [dispatch])

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link
          to='/'
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <StorefrontIcon sx={{ display: { xs: 'none', md: 'flex' } }} />
          <Typography
            variant='h6'
            noWrap
            component='span'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto, sans-serif',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <span style={{ fontWeight: 'bold' }}>book</span>Shop
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <NavLink to='/catalog' style={navLinkStyle}>
            Catalog
          </NavLink>

          <NavLink to='/add-product' style={navLinkStyle}>
            Add Product
          </NavLink>

          <NavLink to='/about' style={navLinkStyle}>
            About
          </NavLink>

          <NavLink to='/contact' style={navLinkStyle}>
            Contact
          </NavLink>
        </Box>

        <IconButton sx={{ marginRight: '1rem' }} onClick={colorMode.toggleColorMode} color='inherit'>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Badge badgeContent={itemInCart} color='secondary' sx={{ marginRight: '1rem' }} component={Link} to={'/basket'}>
          <ShoppingCartIcon sx={{ color: 'white' }} />
        </Badge>

        <Button color='inherit'>Login</Button>
        <Button color='inherit'>Register</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
