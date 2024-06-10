import { indigo } from '@mui/material/colors'

function Footer() {
  return (
    <footer style={{ textAlign: 'center', marginTop: '1rem', backgroundColor: indigo[500] }}>
      <p style={{color: 'white'}}>&copy; 2024 Book Shop</p>
    </footer>
  )
}

export default Footer
