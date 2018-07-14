import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

import axios from "axios";

class CartStore extends EventEmitter {
  constructor() {
    super()
    this.cart = [];



}

  receiveCartItems(CartItems) {
         this.cart = CartItems;

       this.emit("change");

   }


  getAll() {
    return this.cart;

  }

  handleActions(action) {
    switch(action.type) {
    case "RECEIVE_CartItems": {

      this.receiveCartItems(action.CartItems);
        break;
     }

     }
   }
  }
const cartStore = new CartStore;
CartStore.dispatchToken = dispatcher.register(cartStore.handleActions.bind(cartStore));
window.cartStore=cartStore;
export default cartStore;
