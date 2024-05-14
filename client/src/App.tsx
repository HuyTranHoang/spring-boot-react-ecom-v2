import { Container } from '@mui/material'
import Catalog from './features/catalog/Catalog.tsx'
import Navbar from './ui/Navbar.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductForm from './features/product-crud/ProductForm.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container sx={{ mt: 3 }}>
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='catalog' element={<Catalog />}></Route>
            <Route path='addProduct' element={<ProductForm />}></Route>
            <Route path='*' element={<div>Not Found</div>}></Route>
          </Routes>
        </Container>
        <footer style={{ textAlign: 'center', marginTop: '1rem' }}>
          <p>&copy; 2024 My Shop</p>
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App
