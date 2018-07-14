import dispatcher from "../dispatcher";


export function setPrimaryQuestion(QID,requiredAnswerLT,IN_Answer_ID) {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "Set_Primary_Question",primary:{Q_ID:QID,
                                                            ReqDD:requiredAnswerLT,
                                                            Answer_ID: IN_Answer_ID}});

}
