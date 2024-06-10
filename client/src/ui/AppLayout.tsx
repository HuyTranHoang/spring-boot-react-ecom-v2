import { useMemo, useState } from 'react'
import Navbar from './Navbar.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { indigo, pink } from '@mui/material/colors'
import Footer from './Footer.tsx'


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
      <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <Navbar colorMode={colorMode} theme={theme} />

        <Container sx={{ mt: 3, flexGrow: 1 }}>
          <Outlet />
        </Container>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default AppLayout
