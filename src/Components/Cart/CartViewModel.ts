// CartModel.ts
import { makeObservable, observable, action, computed } from 'mobx';
import { Product } from '../Products/ProductModel';
import CartModel, { CartItem } from './CartModel';
import { getCartItems } from './CartDataProvider';
import productViewModel from '../Products/ProductViewModel';

class CartViewModels {
    public cartModel = CartModel;;

    constructor() {
        makeObservable(this, {
            totalItems: computed,
            totalPrice: computed,
            proPrice:action,
            getCartItems: action,
            addToCart: action,
            removeFromCart: action,
            clearCart: action,
        });
    }

    public get allCartItems(): CartItem | null {
        return this.cartModel.cartItems;
    }

    public get totalItems(): number {
        return 0;
        // return this.cartModel.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
    public proPrice(productId: number): number {
        const product = productViewModel.products.find(el => el.id === productId);
        return product ? product.price : 0;
      }
      
      public get totalPrice(): number {
        if (this.cartModel.cartItems && this.cartModel.cartItems.products) {
          return this.cartModel.cartItems.products.reduce((total, item) => total + this.proPrice(item.productId) * item.quantity, 0);
        } else {
          return 0;
        }
      }

    public async getCartItems(authToken?: string) {
        try {
            const data = await getCartItems('/carts/5', authToken);
            this.cartModel.setCarts(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    public async addToCart(product: Product, quantity: number = 1) {

    }

    public async removeFromCart(productId: number) {
        //this.cartModel.cartItems = this.cartModel.cartItems.filter((item) => item.id !== productId);
    }

    public async clearCart() {
        this.cartModel.cartItems = null;
    }
}

const cartViewModel = new CartViewModels();
export default cartViewModel;
