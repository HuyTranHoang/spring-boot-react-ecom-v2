import HubIcon from '@mui/icons-material/Hub'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function Navbar() {
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
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
