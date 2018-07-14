import React from "react";
import DropDownAnswerYN from "./DropDownAnswer";
import axios from "axios";
import * as AnswerActions from "../../actions/AnswerActions";

export default class FreeFormTextNumeric extends React.Component {
  constructor(props) {
    super();

        this.state = {
        answerOptions: []
      };

  }


   componentDidMount(){
     var url ='https://www.perpetualmotivationfitness.com/PHPSource/Controllers/Controller.php?DDType='+ this.props.Answer_Type_ID +'&Action=DDValues';
     axios.get(url)
     .then(({data}) =>{
       this.setState(
        {answerOptions: data}
      );
     });
   }

   change(Question_ID,Answer_Type_ID,event){
     var offeredAswer = event.target.value;

    // this.setState( function(){
       this.props.changeAns(Question_ID,Answer_Type_ID,event);
    // });

   }

   // function allnumeric(inputtxt)
   // {
   //    var numbers = /^[0-9]+$/;
   //    if(inputtxt.value.match(numbers))
   //    {
   //    alert('Your Registration number has accepted....');
   //    document.form1.text1.focus();
   //    return true;
   //    }
   //    else
   //    {
   //    alert('Please input numeric characters only');
   //    document.form1.text1.focus();
   //    return false;
   //    }

  render() {
    const { edit, Questions_Text ,Answer_Type_ID,Question_ID,dataFormat} = this.props;
    var Answers = this.state.answerOptions;



      return (
        <div class="form-group">
            <input type={""+dataFormat} name={""+Question_ID} onChange={this.change.bind(this,Question_ID,Answer_Type_ID)}/>
        </div>
      );


  }
}
