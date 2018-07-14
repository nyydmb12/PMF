import React from "react";

export default class MultiSelect extends React.Component {
  constructor(props) {
    super();

        this.state = {
        answerOptions: []
      };

  }


  render() {
    const {Answer_Text,valueID}  = this.props;




      return (
<div>
     <input type="checkbox" id={"chkItem"+valueID} value={""+valueID}/>
      <label for={""+valueID}> {Answer_Text}</label>
</div>
      );


  }
}
