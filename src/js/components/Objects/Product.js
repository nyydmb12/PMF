import React from "react";
import * as AnswerActions from "../../actions/AnswerActions";

export default class product extends React.Component {
  constructor(props) {
    super();
    this.addToCart = this.addToCart.bind(this);
      };



      addToCart(prodID)
      {
        console.log(prodID);
        this.props.addToCart(prodID);
      }

  render() {
    const { ID,Name ,Brand,Price,Type,Description,Image_path} = this.props;
    var image_dir = "../../../images/ProductImages/" + Image_path;
    const ProductCardStyle = {
      border:"2px solid gray",
      marginTop: "30px",
      marginLeft:"10px",
      bottom:"0px",
      padding:"5px"
    };

    const ProductDetailsStyle = {
      display:"inline-block",
      padding:"5px"

    };

    const ProductDetailsWidth = {
      display:"inline-block",
      width:"75%",

    };

    const ProductButtonsWidth = {
      width:"25%",
      display:"inline-block",

    };



      return (
        <div style={ProductCardStyle}>
          <div style={ProductDetailsWidth} >
                <span  class="ImageSpan">
                <img src={""+image_dir} height="100" width="100"></img>
                </span>
              <div style={ProductDetailsStyle}>
                <div>
                  <span>
                  <p style={ProductDetailsStyle}>{Name}</p>
                  </span>
                  <span >
                  <p style={ProductDetailsStyle}>Price: {Price}</p>
                  </span>
                </div>
                <div>
                <span >
                <p style={ProductDetailsStyle}>Brand: {Brand}</p>
                </span>
                <span>
                <p style={ProductDetailsStyle}>Best {Type} on the market!</p>
                </span>
              </div>
              <div>
              <span>
              <p style={ProductDetailsStyle}>{Description}</p>
              </span>
              </div>
            </div>
          </div>
          <div style={ProductButtonsWidth}>
            <button class="btn btn-outline-secondary" type="button" onClick= {() =>{this.addToCart(ID)}} >Add To Cart</button>
          </div>
        </div>
      );


  }
}
