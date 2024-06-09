import StorefrontIcon from '@mui/icons-material/Storefront'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Badge, Box, Button, IconButton, Theme, Toolbar, Typography } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

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
  return (
    <AppBar position='static'>
      <Toolbar>
        <StorefrontIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant='h6'
            noWrap
            component='span'
            sx={{
              mx: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            My Shop
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <NavLink to='/catalog' style={navLinkStyle}>
            Catalog
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

        <Badge badgeContent={4} color='secondary' sx={{ marginRight: '1rem' }} component={Link} to={'/basket'}>
          <ShoppingCartIcon sx={{color: 'white'}} />
        </Badge>

        <Button color='inherit'>Login</Button>
        <Button color='inherit'>Register</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
