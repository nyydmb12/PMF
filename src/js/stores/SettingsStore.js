import { EventEmitter } from "events";
import answerStore from "./AnswerStore";
import dispatcher from "../dispatcher";

import axios from "axios";

class SettingsStore extends EventEmitter {
  constructor() {
    super()
     this.primaryAnswerDropDown = null;
     this.primaryAnswerID =null;
     this.primaryID = null;

}


getPrimaryAnswerType()
{
  return   this.primaryAnswerDropDown ;

}

getPrimaryQuestionID()
{
  return   this.primaryID ;

}

getPrimaryAnswerID()
{
  return   this.primaryAnswerID ;

}

setPrimary(In_QID,DDOption,In_Answer_ID) {

      this.primaryAnswerDropDown = DDOption;
      this.primaryAnswerID =In_Answer_ID;
      this.primaryID =In_QID;
     this.emit("change");

 }


  handleActions(action) {
    switch(action.type) {

     case "Set_Primary_Question": {

       this.setPrimary(action.primary.Q_ID, action.primary.ReqDD,action.primary.Answer_ID);
         break;
      }

     }
   }
  }
const settingsStore = new SettingsStore;
settingsStore.dispatchToken = dispatcher.register(settingsStore.handleActions.bind(settingsStore));
window.settingsStore=settingsStore;
export default settingsStore;
