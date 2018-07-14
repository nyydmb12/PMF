import React from "react";
import reactDOm from "react-dom";

export default class ErrorDiv extends React.Component {
  constructor(props) {
    super();
    }



  render() {

  const {errorText} = this.props
  const divStyle = {
  color:'red'
  };

  return(

    <div style={divStyle}>{errorText}</div>

    );
  }
}
