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
import AppLayout from './ui/AppLayout.tsx'
import Basket from './features/basket/Basket.tsx'
import ProductDetails from './features/catalog/ProductDetails.tsx'
import Checkout from './checkout/Checkout.tsx'
import store from './store/store.ts'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='catalog' element={<Catalog />}></Route>
          <Route path='catalog/:productId' element={<ProductDetails />}></Route>
          <Route path='add-product' element={<ProductForm />}></Route>
          <Route path='basket' element={<Basket />}></Route>
          <Route path='checkout' element={<Checkout />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='contact' element={<Contact />}></Route>
          <Route path='server-error' element={<ServerError />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
