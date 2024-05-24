import { Container } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Catalog from './features/catalog/Catalog.tsx'
import Navbar from './ui/Navbar.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductForm from './features/product-crud/ProductForm.tsx'
import HomePage from './pages/HomePage.tsx'
import { useMemo, useState } from 'react'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import NotFound from './pages/NotFound.tsx'
import { ToastContainer } from 'react-toastify'

function App() {
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
          mode
        }
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <BrowserRouter>
        <Navbar colorMode={colorMode} theme={theme} />
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='catalog' element={<Catalog />}></Route>
            <Route path='addProduct' element={<ProductForm />}></Route>
            <Route path='about' element={<About />}></Route>
            <Route path='contact' element={<Contact />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Container>
        <footer style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p>&copy; 2024 My Shop</p>
        </footer>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
