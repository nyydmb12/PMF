import dispatcher from "../dispatcher";
import axios from "axios";



export function getQuestions() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_Questions"});

}

export function createQuestions() {

  var url ='https://www.perpetualmotivationfitness.com/PHPSource/Controllers/Controller.php?Action=GetQuestions&SurveyType=1';
  axios.get(url)
  .then(({data}) =>{
     {this.Questions= data}
       dispatcher.dispatch({type: "RECEIVE_Questions",questions:data});

  });

}
export function markVisible(IN_QID,IN_Vis) {

       dispatcher.dispatch({type: "MARK_Visible",questions:{Question_ID:IN_QID,
                                                           Visible:IN_Vis}});
}

export function processQuestions() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "Process_Questions"});

}
