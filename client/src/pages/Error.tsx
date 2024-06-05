import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import axios from 'axios'

function Error() {
  const ValidateErrorHandling = async () => {
    try {
      const res = await axios.post('/api/buggy/validate-error', { name: 'e', email: 'e' })
      console.log(res)
    } catch (error) {
      console.log(error.response?.data)
    }
  }

  const Error404Handling = async () => {
    try {
      const res = await axios.get('/api/buggy/404')
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const Error500Handling = async () => {
    try {
      const res = await axios.get('/api/buggy/500')
      console.log(res.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <Container>
      <Typography gutterBottom variant='h2' align='center' color='error'>
        Testing error messages
      </Typography>

      <ButtonGroup fullWidth>
        <Button onClick={ValidateErrorHandling}>Test validation error</Button>
        <Button onClick={Error404Handling}>Test 404 error</Button>
        <Button onClick={Error500Handling}>Test 500 error</Button>
      </ButtonGroup>
    </Container>
  )
}

export default Error
