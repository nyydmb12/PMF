import React from "react";
import DDAnswer from "./DropDown";
import MultiSelectAnswer from "./MultiSelect";
import CheckBox from "./Checkbox";
import FreeForm from "./FreeFormText";
import PropTypes from "prop-types";

export default class Answer extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { Question_ID, Answer_Type_ID,changeAns} = this.props;




    if (Answer_Type_ID==1 ||Answer_Type_ID==2 ) { //Drop Down
      return (
      <div>
           <DDAnswer Answer_Type_ID={Answer_Type_ID} changeAns={changeAns} Question_ID={Question_ID}/>

      </div>
      );
    }
    else if (Answer_Type_ID==31) { //multiselect options
      return (
      <div>
           <MultiSelectAnswer Answer_Type_ID={Answer_Type_ID} changeAns={changeAns} Question_ID={Question_ID}/>
      </div>
      );
    }
    else if (Answer_Type_ID==101) {
      return (
      <div>
           <FreeForm Answer_Type_ID={Answer_Type_ID} changeAns={changeAns} dataFormat="Number" Question_ID={Question_ID}/>
      </div>
      );
    }
    else if (Answer_Type_ID==3) {
      return (

      <div>

           <CheckBox Answer_Type_ID={Answer_Type_ID} changeAns={changeAns} dataFormat="checkbox" Question_ID={Question_ID}/>

      </div>
      );
    }

    }
  }
  Answer.PropTypes={
  Answer_Type_ID:  PropTypes.number.isrequired,
  Question_ID:PropTypes.number.isrequired
  }
