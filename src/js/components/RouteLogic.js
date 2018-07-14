import { Switch, Route,BrowserRouter } from 'react-router-dom'
import AboutMe from "../pages/AboutMe";
import Survey from "../pages/Survey";
import Layout from "../pages/Layout";
import Settings from "../pages/Settings";
import Merch from "../pages/Merch";

import React from "react";


export default class RouteLogic extends React.Component {
  render() {
    return (
<main>
  <Switch>
    <Route exact path="/Survey" component={Survey}/>
    <Route path="/AboutMe" component={AboutMe}/>
    <Route path="/settings" component={Settings}/>
    <Route path="/Merch" component={Merch}/>
  </Switch>
</main>)
  }
}
