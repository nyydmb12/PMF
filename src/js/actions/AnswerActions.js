import dispatcher from "../dispatcher";




export function AddUpdateAnswer(Question_ID,Offered_Answer_ID,Answer_Type_ID) {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
    dispatcher.dispatch({type: "CREATE_Answers",answer:{Question_ID:Question_ID,
                                                        Offered_Answer_ID:Offered_Answer_ID,
                                                        Answer_Type_ID:Answer_Type_ID}});


}

export function RemoveAnswer(Question_ID,Offered_Answer_ID,Answer_Type_ID) {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
    dispatcher.dispatch({type: "Remove_Answers",answer:{Question_ID:Question_ID,
                                                        Offered_Answer_ID:Offered_Answer_ID,
                                                        Answer_Type_ID:Answer_Type_ID}});
   dispatcher.dispatch({type: "UnmarkQuestAnswered",answer:{Question_ID:Question_ID}});




}
export function submitSurvey(Part_ID) {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  console.log(Part_ID);
    dispatcher.dispatch({type: "Submit_Survey",answer:{Part_ID:Part_ID}});


}
