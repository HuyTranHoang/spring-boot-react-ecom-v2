import HubIcon from '@mui/icons-material/Hub'
import { AppBar, IconButton, Theme, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

type NavbarProps = {
  colorMode: { toggleColorMode: () => void }
  theme: Theme
}

function Navbar({ colorMode, theme }: NavbarProps) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <HubIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
