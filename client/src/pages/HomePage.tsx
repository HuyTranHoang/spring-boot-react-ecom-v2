import { Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <Link to='/catalog' style={{ textDecoration: 'none' }}>
        <Typography variant='h5' color={blue[600]}>
          Catalog Page
        </Typography>
      </Link>

      <br />

      <Link to='/addProduct' style={{ textDecoration: 'none' }}>
        <Typography variant='h5' color={blue[600]}>
          Add Product Page
        </Typography>
      </Link>
    </div>
  )
}

export default HomePage
