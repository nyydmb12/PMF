import dispatcher from "../dispatcher";
import axios from "axios";



export function getCartItems() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_CartItems"});

}

export function addToCart(IN_prodID) {

  axios.post('https://www.perpetualmotivationfitness.com/PHPSource/Controllers/StoreController.php',{
   Action:'addToCart',
   prodID:IN_prodID
  })
   .then(function (response) {
     dispatcher.dispatch({type: "RECEIVE_CartItems",CartItems:response.data});
         console.log(response);

  })
  .catch(function (error) {
   console.log(error);
 });

}
