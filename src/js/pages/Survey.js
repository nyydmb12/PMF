import React from "react";
import Question from "../components/Objects/Question";
import LoginPane from "../components/Objects/LoginPane";
import * as QuestionActions from "../actions/QuestionActions";
import * as AnswerActions from "../actions/AnswerActions"
import QuestionStore from "../stores/QuestionStore";
import AnswerStore from "../stores/AnswerStore";
import ErrorBoundary from "../components/ErrorBoundary";
import PropTypes from "prop-types";

export default class Survey extends React.Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.pushVisibleQuestion = this.pushVisibleQuestion.bind(this);
    console.log("surveyConstruct")
    this.state = {
      Questions: QuestionActions.createQuestions(),
      Answers:  AnswerStore.getAll(),
      ParticipantID: null,
      AllQuestionsAnswered: false
        };
  }

  componentWillMount() {

    QuestionStore.on("change", this.getQuestions);
  //  this.setState = {
//      Questions: QuestionActions.getQuestions(),
  //    Answers:  AnswerStore.getAll()
//    };

  }


  componentWillUnmount() {

    QuestionStore.removeListener("change", this.getQuestions);
  }

  getQuestions() {
    this.setState({
      Questions: QuestionStore.getAll(),

    });
  }
  change(Question_ID,Answer_Type_ID,event){
    var offeredAswer = event.target.value;


  if(Answer_Type_ID == 3)//MultiSelect checkboxes
  {
    var isChecked = event.target.checked;

    if(isChecked)
    {
        AnswerActions.AddUpdateAnswer(Question_ID,offeredAswer,Answer_Type_ID);
    }
    else {
        AnswerActions.RemoveAnswer(Question_ID,offeredAswer,Answer_Type_ID);
    }


  }
else {

      if(offeredAswer==-9999) //default value selected answer remvoved
      {
        AnswerActions.RemoveAnswer(Question_ID,offeredAswer,Answer_Type_ID);
      }
      else {
          AnswerActions.AddUpdateAnswer(Question_ID,offeredAswer,Answer_Type_ID);
      }


}


  }

  participantCreated(Participant_ID){ //set participant id from loginpane
    this.setState({
      ParticipantID :Participant_ID

    });


  }

  pushVisibleQuestion(Question_ID,Is_Visible)
  {

    QuestionActions.markVisible(Question_ID,Is_Visible);
  }

  submitQuestions(event)
  {

    if(QuestionStore.isVisibleQuestionsAnswered())
    {
console.log(this.state.ParticipantID);
    AnswerActions.submitSurvey(this.state.ParticipantID);

    }
    else {
      QuestionActions.processQuestions();//Update store to mark required questions
    }
  }



  render() {
    const { Questions, ParticipantID} = this.state;



if (ParticipantID == null)//login not completed
{
    return (<LoginPane partCreate ={this.participantCreated.bind(this)}/>);
}
else { //login completed


  if (Questions == undefined) //question store not hydrated
    {
        return null;

    }
    else //question store hydrated
    {
            const QuestionComponents = Questions.map((question) => {
                  return <Question key={question.Question_ID} questArray={Questions} pushQID={this.pushVisibleQuestion.bind(this)} changeAns={this.change.bind(this)} {...question}/>;
              });

        return (

          <div>
            <ul>{QuestionComponents}</ul>
              <input id="SurveySubmit" type="button"  class="btn btn-outline-secondary" value="Submit" onClick={this.submitQuestions.bind(this)}/>
          </div>
          );
  }
}


    }
}
Survey.PropTypes={

AnswerType:PropTypes.number,
Question_ID:PropTypes.number

}
