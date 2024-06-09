import { useMemo, useState } from 'react'
import Navbar from './Navbar.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { indigo, pink } from '@mui/material/colors'


function AppLayout() {

  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: indigo,
          secondary: pink,
        },
      }),
    []
  )

  return (
    <ThemeProvider theme={theme}>
      <Navbar colorMode={colorMode} theme={theme} />

      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>


      <footer style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>&copy; 2024 My Shop</p>
      </footer>
    </ThemeProvider>
  )
}

export default AppLayout
