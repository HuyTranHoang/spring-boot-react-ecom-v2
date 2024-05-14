import HubIcon from '@mui/icons-material/Hub'
import { AppBar, Toolbar, Typography } from '@mui/material'

function Navbar() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <HubIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant='h6'
          noWrap
          component='a'
          href='#app-bar-with-responsive-menu'
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
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
