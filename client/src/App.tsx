import { Container } from '@mui/material'
import Catalog from './features/catalog/Catalog.tsx'
import Navbar from './ui/Navbar.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <Catalog />
      </Container>
    </>
  )
}

export default App
