import axios from 'axios'

async function fetchBasket() {
  try {
    const res = await axios.get('/api/basket')
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch basket')
  }
}

async function addBasketItem(productId: number) {
  try {
    const res = await axios.post(`/api/basket?productId=${productId}&quantity=1`, {})
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add item')
  }
}

async function removeBasketItem(productId: number) {
  try {
    const res = await axios.delete(`/api/basket?productId=${productId}`)
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to remove item')
  }
}

async function updateBasketItem(productId: number, quantity: number) {
  try {
    const res = await axios.put(`/api/basket?productId=${productId}&quantity=${quantity}`)
    return res.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update item')
  }
}

export { fetchBasket, addBasketItem, removeBasketItem, updateBasketItem }
