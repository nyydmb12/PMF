import React from "react";
import QuestionAnswerTypes from "../components/Objects/QuestionAnswerTypesDropDown";
import * as QuestionActions from "../actions/QuestionActions";
import * as SettingActions from "../actions/SettingsActions";
import DropDownQuestion from "../components/Objects/DropDownAnswer";
import MultiSelectAnswer from "../components/Objects/MultiSelect";
import QuestionStore from "../stores/QuestionStore";
import SettingsStore from "../stores/SettingsStore";
import axios from "axios";


export default class Settings extends React.Component {
  constructor() {
    super();
    this.getPrimaryData = this.getPrimaryData.bind(this);
    this.removePrimaryData = this.removePrimaryData.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      dropDownType:-9999,
      primaryAnswerDropDown : null,
      primaryAnswerID:null,
      primaryID : null,
      questions:  QuestionActions.createQuestions()

    };
  }


  componentWillMount() {

    QuestionStore.on("change", this.handleSubmit);
    SettingsStore.on("change", this.getPrimaryData);


  }


  componentWillUnmount() {

    QuestionStore.removeListener("change", this.handleSubmit);
    SettingsStore.removeListener("change", this.getPrimaryData);
  }

  DDChange(Question_ID,Answer_Type_ID,event)
  {
    var requiredAnswer = event.target.value;

    SettingActions.setPrimaryQuestion(Question_ID,Answer_Type_ID,requiredAnswer);

    }
    getQuestions() {
      this.setState({
        questions: QuestionStore.getAll()
      });

      console.log("getquestions");
    }

  createQuestion()
  {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    var dropDown = document.getElementById("Question_Answer_Types");
    var  AnswerType= dropDown.options[dropDown.selectedIndex].value;
    var primaryQid = this.state.primaryID;
    var primaryAnswerDropDown  = this.state.primaryAnswerDropDown;
    var primaryAnswerID = this.state.primaryAnswerID;

    var textInput = document.getElementById('QText').value;
      console.log(textInput);
    var url ='https://www.perpetualmotivationfitness.com/PHPSource/Controllers/Controller.php?Action=CreateQuestion&Answer_Type='+AnswerType+'&Question_Text="'+textInput+'"&SurveyID=1'+'&PrimaryQID='+primaryQid+'&QIDAns='+primaryAnswerID;
      console.log(url);
    axios.get(url)

     QuestionActions.createQuestions();

  }

  handleSubmit()
  {
    this.removePrimaryData();
    this.getQuestions() ;

  }

  SetPrimary(question,event)
  {

    var primaryID = event.target.value;
    var requiredAnswerLT = question[primaryID-1].Answer_Type_ID;


     SettingActions.setPrimaryQuestion(primaryID,requiredAnswerLT,null);
    }

    getPrimaryData()
    {
      this.setState({
        primaryAnswerDropDown : SettingsStore.getPrimaryAnswerType(),
        primaryAnswerID :SettingsStore.getPrimaryAnswerID(),
        primaryID : SettingsStore.getPrimaryQuestionID()
      });
    console.log("getPrimary");


    }

    removePrimaryData()
    {


      this.setState({
        primaryAnswerDropDown : null,//SettingsStore.getPrimaryAnswerType(),
        primaryAnswerID :null,//SettingsStore.getPrimaryAnswerID(),
        primaryID : null//SettingsStore.getPrimaryQuestionID()
      });
  console.log("RemovePrimary");


    }


  render() {
const {primaryAnswerDropDown, primaryID,questions} = this.state;



  if (questions != undefined)
{
  const questionOptions = questions.map((question) => {
        return <DropDownQuestion key={question.Question_ID} valueID={question.Question_ID} Answer_Text={question.Questions_Text} {...DropDownQuestion}/>;
    });
    return (

      <form onSubmit={this.createQuestion.bind(this)}>
        <div>This page is a proof of concept. Here questions added will be added to the survey page in real time.</div>
      <div>
        <label for="QText"> Question Text: </label>
        <input type="text" id="QText"/>
      </div>

      <div>
        <label> What Kind of Answer will be used for this Question?</label>
        <QuestionAnswerTypes changeAns={this.DDChange.bind(this)}/>
      </div>

      <div>
        <label>Is this question secondary to another?</label>
        <div class="form-group">
                    <select class="form-control" id="Subordinate_to_Options" onChange={this.SetPrimary.bind(this,questions)}>
                    <option value="-9999">Please Select an Answer</option>
                    {questionOptions}
                     </select>
                  </div>

      </div>
      <div>
        <label> What answer from the primary will make this required?</label>
         <MultiSelectAnswer Answer_Type_ID={primaryAnswerDropDown} changeAns={this.DDChange.bind(this)} Question_ID={primaryID}/>
      </div>

  <input class="btn btn-outline-secondary" type="submit" value="Submit"/>
</form>

    );
  }
  else {
    return  null;
  }
}


}
