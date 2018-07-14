import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import axios from "axios";
class AnswerStore extends EventEmitter {
  constructor() {
    super()
    this.Answers = [];




  }
  createAnswer(AnswerValue) {

var v_answer_exists = false;

if(AnswerValue.Answer_Type_ID!=3)
{
    for(var i = this.Answers.length - 1; i >= 0; i--) {
      if(this.Answers[i].Question_ID == AnswerValue.Question_ID) {
       this.Answers[i].Offered_Answer_ID = AnswerValue.Offered_Answer_ID
       v_answer_exists = true;
     }
   }
 }

if(v_answer_exists==false || AnswerValue.Answer_Type_ID==3)//answer for question not present or check box qanswer
{
    this.Answers.push({
      Question_ID:AnswerValue.Question_ID,
      Offered_Answer_ID:AnswerValue.Offered_Answer_ID,
      DropDownTypeID: AnswerValue.Answer_Type_ID,
    });
  }
    // this.Answers[AnswerValue.Question_ID-1].Offered_Answer_ID=AnswerValue.Offered_Answer_ID;
     //this.Answers[AnswerValue.Question_ID-1].DropDownTypeID = AnswerValue.Answer_Type_ID;


   }

   removeAnswer(AnswerValue) {
     for(var i = this.Answers.length - 1; i >= 0; i--) {
       console.log(this.Answers[i]);
       if(this.Answers[i].Question_ID == AnswerValue.Question_ID || (AnswerValue.Answer_Type_ID==3 && this.Answers[i].Offered_Answer_ID == AnswerValue.Offered_Answer_ID)) {
       this.Answers.splice(i, 1);
      }
    }

    }

   getAnswerID(answerQid){ //get master q;uestion answer id

 var returnVal =null;
     for(var i = this.Answers.length - 1; i >= 0; i--) {
       if(this.Answers[i].Question_ID == answerQid) { //get of
         returnVal  = this.Answers[i].Offered_Answer_ID;
      }
    };
   return returnVal;

   }


  getAll() {
    return this.Answers;
  }

  submitSurvey(Part_ID){
    var JSONAnswers = JSON.stringify(this.Answers);
    axios.post('https://www.perpetualmotivationfitness.com/PHPSource/Controllers/Controller.php',{
     Action:'Submit_Survey',
     Participant:Part_ID,
      Answers :JSONAnswers,
      SurveyID : 1

    })
     .then(function (response) {
      //  part_ID = response.data[0].Success;
           console.log(response);

    })
    .catch(function (error) {
     console.log(error);
   });

  }

  handleActions(action) {
    switch(action.type) {
    case "RECEIVE_Questions": {
        this.Questions = action.questions;
        this.emit("change");
        break;
     }
     case "CREATE_Answers": {

       this.createAnswer(action.answer);
           break;

         }
         case "Remove_Answers": {

           this.removeAnswer(action.answer);
               break;

             }
             case "Submit_Survey": {
               this. submitSurvey(action.answer.Part_ID);
                   break;

                 }


     }
   }
  }

const answerStore = new AnswerStore;
answerStore.dispatchToken = dispatcher.register(answerStore.handleActions.bind(answerStore));
window.answerStore=answerStore;

export default answerStore;
