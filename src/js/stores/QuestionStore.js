import { EventEmitter } from "events";
import answerStore from "./AnswerStore";
import dispatcher from "../dispatcher";

import axios from "axios";

class QuestionStore extends EventEmitter {
  constructor() {
    super()
    this.Questions = [];



}

  receiveQuestions(questions) {
       this.Questions = questions;

       this.emit("change");

   }

   MarkAnswered(AnswerValue)
   {
      this.Questions[AnswerValue.Question_ID-1].Answered="Yes";

   }
   NotMarkAnswered(AnswerValue)
   {
     var ansPresent=false;
     for(var i = answerStore.Answers.length - 1; i >= 0; i--) {
       if(answerStore.Answers[i].Question_ID == AnswerValue.Question_ID) { //get of
        ansPresent=true;
      }
    };

    if (!ansPresent)
    {
      this.Questions[AnswerValue.Question_ID-1].Answered="No";
    }

   }


  getAll() {
    return this.Questions;

  }
  VisibleQuestion(Question_ID,In_Value)
  {
    this.Questions[Question_ID-1].Visible=In_Value;

  }

  isVisibleQuestionsAnswered()
  {

    var allQuestAswered = true;
    this.Questions.forEach(function(quest){


      if (quest.Visible=="Yes")
      {
      //    console.log("Visible:"+quest.Visible);
        if (quest.Answered=="No")
        {
      //          console.log("answered:"+quest.Answered);
          quest["Required"]=true;
          allQuestAswered=false;
        }
        else {
          quest["Required"]=false;
        }
      }
      else //not visible not required
        {
            quest["Required"]=false;
        }


    })
    return allQuestAswered;

  }


  handleActions(action) {
    switch(action.type) {
    case "RECEIVE_Questions": {

      this.receiveQuestions(action.questions);
        break;
     }
     case "FETCH_Questions": {

           this.getAll();

           break;

         }
         case "CREATE_Answers": {
           this.MarkAnswered(action.answer);
          this.getAll();
           this.emit("change");
               break;

             }
             case "UnmarkQuestAnswered": {
               this.NotMarkAnswered(action.answer);
                this.emit("change");

                   break;

                 }
            case "MARK_Visible":{
              this.VisibleQuestion(action.questions.Question_ID,action.questions.Visible);

                  break;

            }
            case "Process_Questions":{
              this.isVisibleQuestionsAnswered();
               this.emit("change");
                  break;

            }

     }
   }
  }
const questionStore = new QuestionStore;
questionStore.dispatchToken = dispatcher.register(questionStore.handleActions.bind(questionStore));
window.questionStore=questionStore;
export default questionStore;
