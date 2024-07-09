export default interface Product {
  id: number
  name: string
  description: string
  unitPrice: number
  imageUrl: string
  unitInStock: number
  brand: string
  categoryId: number
  categoryName: string
}

export interface ProductParams {
  name? : string;
  brand?: string[];
  categoryName?: string[];
  pageNumber: number;
  pageSize: number;
  sort: string;
}