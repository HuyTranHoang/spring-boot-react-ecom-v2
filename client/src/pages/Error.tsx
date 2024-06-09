import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from 'axios'
import { useState } from "react";

function Error() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const config = {
    headers: {'content-type': 'application/json'}
  };

  const ValidateErrorHandling = async () => {
    try {
      await axios.post('/api/buggy/validate-error', {name: 'e', email: 'few'}, config);
    } catch (errors) {
      console.log(errors);
      setValidationErrors(errors);
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

      {validationErrors.length > 0 &&
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(error => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      }
    </Container>
  )
}

export default Error
