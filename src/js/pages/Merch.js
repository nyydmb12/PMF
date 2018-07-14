import React from "react";
import ProductComp from "../components/Objects/Product";
import * as ProductActions from "../actions/ProductActions";
import * as CartActions from "../actions/CartActions";
import Productstore from "../stores/Productstore";
import Cartstore from "../stores/Cartstore";
export default class Merch extends React.Component {

  constructor(props) {
    super();
      this.getProducts = this.getProducts.bind(this);
      this.getCartItems = this.getCartItems.bind(this);
        this.state = {
        Products: ProductActions.ReceiveProducts(),
        Cart: CartActions.getCartItems(),
      };

  }
  componentWillMount() {

    Productstore.on("change", this.getProducts);
    Productstore.on("change", this.getProducts);
  }


  componentWillUnmount() {

    Productstore.removeListener("change", this.getProducts);
    Productstore.removeListener("change", this.getProducts);
  }

  getProducts() {
    this.setState({
      Products: Productstore.getAll(),

    });
  }
  getCartItems() {
    this.setState({
      Cart: cartStore.getAll(),

    });
  }

  addToCart(prod_ID)
  {

    CartActions.addToCart(prod_ID);
  }

  render() {
  const Products = this.state.Products;
    if (Products == undefined) //Products store not hydrated
      {
          return null;

      }
      else {


          const ProductComponents = Products.map((product) => {
                return <ProductComp key={product.ID} addToCart={this.addToCart.bind(this)} Name={product.name}  Brand={product.brand}  Price={product.price}  Type={product.type}  Descripiton={product.Description} Image_path={product.imagePath} {...product}/>;
            });

          return (

            <section class="Store">
            <h1>Add to Cart Feature Comming!</h1>
              {ProductComponents}
            </section>
          );
        }
  }
}
