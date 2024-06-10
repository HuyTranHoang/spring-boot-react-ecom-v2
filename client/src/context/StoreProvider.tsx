import { useState } from "react";
import Basket from "../type/basket.type.ts"
import { StoreContext } from "./StoreContext";


export function StoreProvider({children}) {
  const [basket, setBasket] = useState<Basket | null>(null);

  const removeItem = (productId: number, quantity: number) => {
    if (!basket)
      return;

    const basketItems = [...basket.basketItems];
    const itemIndex = basketItems.findIndex(i => i.productId === productId);

    if (itemIndex > -1) {
      basketItems[itemIndex].quantity -= quantity;

      if (basketItems[itemIndex].quantity <=0) {
        basketItems.splice(itemIndex, 1);
      }

      setBasket(prevState => {
        return {...prevState!, basketItems}
      })
    }
  }

  return (
    <StoreContext.Provider value={{
      basket: basket,
      setBasket: setBasket,
      removeItem: removeItem,
    }}>
      {children}
    </StoreContext.Provider>
  );
}