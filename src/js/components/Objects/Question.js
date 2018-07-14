import React from "react";
import Answer from "./Answer"
import AnswerStore from "../../stores/AnswerStore";
import ErrorDiv from "./ErrorDiv";
import * as AnswerActions from "../../actions/AnswerActions";


export default class Question extends React.Component {
  constructor(props) {
    super();
    this.pushQid = this.pushQid.bind(this);
  }

  pushQid(QID,Is_Visible)
  {

    this.props.pushQID(QID,Is_Visible);
  }

  render() {
    const {  Question_ID, Questions_Text, Answer_Type_ID,Answered,Subordinate_to,questArray,changeAns,Required_Offered_Answer,Required} = this.props;

    const divStyle = {
    overflow:'hidden'
    };

    var errorText;

    if(Required)
    {
      errorText="Please Answer This Question"
    }
    else {
        errorText="";
    }

var masterAnswered
var masterAnsweredValue
if(Subordinate_to != null )
{
  masterAnsweredValue =AnswerStore.getAnswerID(Subordinate_to);
  if(questArray[Subordinate_to-1].Answered == "Yes"  && masterAnsweredValue==Required_Offered_Answer)
  {
    masterAnswered = true;
  }
  else
    {
      masterAnswered = false;

    }
  }
  else {
    masterAnswered = true;
  }


if(masterAnswered==true || Subordinate_to == null )
{
  this.pushQid(Question_ID,"Yes");

    if(Subordinate_to != null)
    {
      return (
          <div id={Question_ID}  style={divStyle}>

              <div style={{width:'85%', float:'right'}}>
              <ErrorDiv errorText={errorText}/>
                <span><h3>{Questions_Text}</h3></span>
                <Answer Question_ID={Question_ID} changeAns={changeAns} Answer_Type_ID={Answer_Type_ID} Required={Required}/>

              </div>
          </div>
        );
    }
    else {

        return (
          <div  style={divStyle}>
           <ErrorDiv errorText={errorText}/>
            <span><h3>{Questions_Text}</h3></span>
            <Answer Question_ID={Question_ID} changeAns={changeAns} Answer_Type_ID={Answer_Type_ID}/>

          </div>
        );

    }
  }
  else {
      this.pushQid(Question_ID,"No");
    return null;
  }

  }
}
