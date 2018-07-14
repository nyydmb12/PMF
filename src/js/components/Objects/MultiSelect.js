import React from "react";
import DropDownAnswerYN from "./DropDownAnswer";
import axios from "axios";
import * as AnswerActions from "../../actions/AnswerActions";

export default class MultiSelect extends React.Component {
  constructor(props) {
    super();

        this.state = {
        answerOptions: []
      };

  }


   componentDidMount(){
   //getAnswerOptions(){
     var url ='https://www.perpetualmotivationfitness.com/PHPSource/Controllers/Controller.php?DDType='+ this.props.Answer_Type_ID +'&Action=DDValues';
     axios.get(url)
     .then(({data}) =>{
//     this.setState(
  //      {answerOptions: data}
  //    );
     });
   }

   change(Question_ID,Answer_Type_ID,event){
     var offeredAswer = event.target.value;

    // this.setState( function(){
       this.props.changeAns(Question_ID,Answer_Type_ID,event);
    // });

   }

  render() {
    const { edit, Questions_Text ,Answer_Type_ID,Question_ID} = this.props;
    var Answers = this.state.answerOptions;
    //this.getAnswerOptions();
  const answerComponents = Answers.map((answer) => {
        return <DropDownAnswerYN key={answer.Offered_Answer_ID} valueID={answer.Offered_Answer_ID} Answer_Text={answer.Answer_Text} {...DropDownAnswerYN}/>;
    });



      return (
        <div class="form-group">
                    <select multiple class="form-control" id="exampleSelect1" onChange={this.change.bind(this,Question_ID,Answer_Type_ID)}>
                    {answerComponents}
                     </select>
                  </div>
      );


  }
}
