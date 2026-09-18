export interface Product {
  name: string;
  price: number;
  description?: string;
  photos: string[];
}

export interface CartItem extends Product {
  qty: number;
}
