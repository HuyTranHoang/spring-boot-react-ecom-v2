import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Basket from '../type/basket.type.ts'
import { getCookie } from '../utils/util.ts'
import axios, { AxiosResponse } from 'axios'

interface BasketContextType {
  basket: Basket | null,
  setBasket: (basket: Basket) => void,
  updateItem: (productId: number, quantity: number) => void,
  removeItem: (productId: number) => void
}

const BasketContext = createContext<BasketContextType | null>(null)

function BasketsProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number) => {
    if (!basket)
      return;

    const basketItems = [...basket.basketItems];
    const itemIndex = basketItems.findIndex(i => i.productId === productId);

    if (itemIndex > -1) {
      basketItems.splice(itemIndex, 1);
      setBasket(prevState => {
        return {...prevState!, basketItems}
      })
    }
  }

  const updateItem = (productId: number, quantity: number) => {
    if (!basket)
      return;

    const basketItems = [...basket.basketItems];
    const itemIndex = basketItems.findIndex(i => i.productId === productId);

    if (itemIndex > -1) {
      const item = basketItems[itemIndex];
      item.quantity = quantity;
      basketItems[itemIndex] = item;
      setBasket(prevState => {
        return {...prevState!, basketItems}
      })
    }
  }

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    console.log(buyerId);
    if (buyerId) {
      axios.get('/api/basket')
        .then((response: AxiosResponse) => setBasket(response.data))
        .catch(err => console.log(err))
    }
  }, [setBasket]);

  return (
    <BasketContext.Provider value={{
      basket,
      setBasket,
      updateItem,
      removeItem
    }}>
      {children}
    </BasketContext.Provider>
  );
}

function useBaskets() {
  const context = useContext(BasketContext)
  if (!context) {
    throw new Error('useBaskets must be used within a BasketProvider')
  }
  return context
}

export { BasketsProvider, useBaskets }
