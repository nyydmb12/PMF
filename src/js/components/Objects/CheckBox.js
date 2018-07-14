import React from "react";
import CheckBoxAnswer from "./CheckBoxAnswer";
import axios from "axios";
import * as AnswerActions from "../../actions/AnswerActions";

export default class CheckBox extends React.Component {
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

  render() {
    const { edit, Questions_Text ,Answer_Type_ID,Question_ID} = this.props;
    var Answers = this.state.answerOptions;

  const answerComponents = Answers.map((answer) => {
        return <CheckBoxAnswer key={answer.Offered_Answer_ID} valueID={answer.Offered_Answer_ID} Answer_Text={answer.Answer_Text} {...CheckBoxAnswer}/>;
    });



      return (
        <fieldset id={""+Question_ID} onChange={this.change.bind(this,Question_ID,Answer_Type_ID)}>
              {answerComponents}
        </fieldset>

      );


  }
}
