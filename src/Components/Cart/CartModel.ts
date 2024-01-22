// CartModel.ts
import { makeObservable, observable, action, computed } from 'mobx';
import { Product } from '../Products/ProductModel';

export interface CartProducts {
    productId: number;
    quantity: number;
  }
  
export interface CartItem {
    id: number;
    userId: number;
    date: string;
    products: CartProducts[];
    __v: number;
  }

class CartStore {
  cartItems: CartItem | null= null;

  constructor() {
    makeObservable(this, {
      cartItems: observable,
      setCarts: action,
     
    });
  }
  setCarts(cartItems: CartItem) {
    this.cartItems = cartItems;
  }
}

const CartModel = new CartStore();
export default CartModel;
