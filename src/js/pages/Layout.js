import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import RouteLogic from "../components/RouteLogic";

export default class Layout extends React.Component {
  render() {

    const { location } = this.props;
      return (
      <div>
        <Header/>

                       <div class="PageWrapper">


                      <RouteLogic/>



                      </div>
                        <Footer/>
      </div>

    );
  }
}
