import React from "react";
import axios from "axios";

export default class LoginPane extends React.Component {
  constructor(props) {
    super();
      this.raiseCreatePartEvent =   this.raiseCreatePartEvent.bind(this);
        this.createParticipant =   this.createParticipant.bind(this);

  }

createParticipant(e)
{
  var emailAddress = document.getElementById("email").value;
  var part_ID;
  var self = this; //WTF this fixed it

console.log('\"'+emailAddress+'\"');
emailAddress ='\"'+emailAddress+'\"';
  axios.post('https://www.perpetualmotivationfitness.com/PHPSource/Controllers/Controller.php',{
   Action:'Part_Email',
    email : emailAddress

  })
   .then(function (response) {
      part_ID = response.data[0].Part_ID;
          console.log(part_ID);
      self.raiseCreatePartEvent(part_ID);

  })
  .catch(function (error) {
   console.log(error);
 });
}

raiseCreatePartEvent(Part_ID)
{
  console.log(Part_ID);
  this.props.partCreate(Part_ID);

}

  render() {

      return (
        <div>
        <div>This page is a proof of concept. Upon pressing submit you can particpate in our survey</div>
        <h2>Simply press the start button to begin, or If you would like to have your results sent to you enter your E-Mail Address</h2>
        E-mail: <input id="email" type="text" name="email"/><br/>
        <input id="loginSubmit" type="button" value="Start"  class="btn btn-outline-secondary" onClick={this.createParticipant}/>
        </div>
      );


  }
}
