import CssBaseline from '@mui/material/CssBaseline'
import Catalog from './features/catalog/Catalog.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductForm from './features/product-crud/ProductForm.tsx'
import HomePage from './pages/HomePage.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import NotFound from './features/error/NotFound.tsx'
import { ToastContainer } from 'react-toastify'
import ServerError from './features/error/ServerError.tsx'
import AxiosInterceptor from './features/interceptor/AxiosInterceptor.tsx'
import AppLayout from './ui/AppLayout.tsx'
import Basket from './features/basket/Basket.tsx'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ToastContainer />
      <AxiosInterceptor />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='catalog' element={<Catalog />}></Route>
          <Route path='addProduct' element={<ProductForm />}></Route>
          <Route path='basket' element={<Basket />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='contact' element={<Contact />}></Route>
          <Route path='server-error' element={<ServerError />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
