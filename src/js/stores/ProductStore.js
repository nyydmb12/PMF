import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

import axios from "axios";

class ProductStore extends EventEmitter {
  constructor() {
    super()
    this.Products = [];



}

  receiveProducts(Products) {
       this.Products = Products;

       this.emit("change");

   }


  getAll() {
    return this.Products;

  }

  handleActions(action) {
    switch(action.type) {
    case "RECEIVE_Products": {

      this.receiveProducts(action.Products);
        break;
     }

     }
   }
  }
const productStore = new ProductStore;
ProductStore.dispatchToken = dispatcher.register(productStore.handleActions.bind(productStore));
window.productStore=productStore;
export default productStore;
