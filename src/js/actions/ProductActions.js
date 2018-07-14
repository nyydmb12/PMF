import dispatcher from "../dispatcher";
import axios from "axios";



export function getProducts() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_Products"});

}

export function ReceiveProducts() {

  axios.post('https://www.perpetualmotivationfitness.com/PHPSource/Controllers/StoreController.php',{
   Action:'getProducts'
  })
   .then(function (response) {
     dispatcher.dispatch({type: "RECEIVE_Products",Products:response.data});
         console.log(response);

  })
  .catch(function (error) {
   console.log(error);
 });

}
