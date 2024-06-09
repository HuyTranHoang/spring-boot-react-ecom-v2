import { BasketItem } from './basketItem.type.ts'

export default interface Basket {
  id: number
  buyerId: string
  basketItems: BasketItem[]
}