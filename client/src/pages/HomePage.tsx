import { styled, Typography } from '@mui/material'
import { green, pink } from '@mui/material/colors'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)({
  margin: '10px',
  padding: '30px',
  borderRadius: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'block',
  width: '100%'
})

function HomePage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <StyledLink to='/catalog' sx={{ backgroundColor: pink[300] }}>
        <Typography variant='h4' textAlign='center' color='white'>
          Catalog Page
        </Typography>
      </StyledLink>

      <StyledLink to='/add-product' sx={{ backgroundColor: green[300] }}>
        <Typography variant='h4' textAlign='center' color='white'>
          Add Product Page
        </Typography>
      </StyledLink>

      <img style={{ width: '350px', borderRadius: '10px', marginTop: '20px' }} src='/homeImg.jpg' alt='bg image' />
      <Typography>Cute Frieren</Typography>
    </div>
  )
}

export default HomePage
