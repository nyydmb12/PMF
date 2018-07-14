import React from "react";
import reactDOm from "react-dom";

export default class DropDownAnswer extends React.Component {
  constructor(props) {
    super();
    }



  render() {

  const {Answer_Text,valueID} = this.props
 //<option>{data}</option>
  return(

    <option value={""+valueID}>{Answer_Text}</option>

    );
  }
}
