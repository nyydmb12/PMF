import React from "react";
import DropDownAnswerYN from "./DropDownAnswer";
import axios from "axios";

export default class QuestionAnswerTypes extends React.Component {
  constructor(props) {
    super();

        this.state = {
        answerOptions: []
      };

  }


   componentDidMount(){
     var url ='https://www.perpetualmotivationfitness.com/PHPSource/Controllers/Controller.php?Action=GetDDTypes';
     axios.get(url)
     .then(({data}) =>{
       this.setState(
        {answerOptions: data}
      );
     });
   }


  render() {

    var Answers = this.state.answerOptions;

  const answerComponents = Answers.map((answer) => {
        return <DropDownAnswerYN key={answer.Answer_Type_ID} valueID={answer.Answer_Type_ID} Answer_Text={answer.Type} {...DropDownAnswerYN}/>;
    });



      return (
        <div class="form-group">
                    <select class="form-control" id="Question_Answer_Types">
                    <option value="-9999">Please Select an Answer</option>
                    {answerComponents}
                     </select>
                  </div>
      );


  }
}
