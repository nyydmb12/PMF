import React from "react";
import { NavLink } from 'react-router-dom';
//import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      NavCollapsed: true,
      ExperCollapsed:false,
    };
  }

  toggleCollapse() {
  const Nvcollapsed = !this.state.NavCollapsed;
    const Excollapsed = this.state.ExperCollapsed;
    this.setState({NavCollapsed:Nvcollapsed,
      ExperCollapsed:Excollapsed});

  }


  togglExperimental() {
    const Nvcollapsed = this.state.NavCollapsed;
    const Excollapsed = !this.state.ExperCollapsed;
    this.setState({NavCollapsed:Nvcollapsed,
      ExperCollapsed:Excollapsed});
  }

  render() {
    const { NavCollapsed,ExperCollapsed } = this.state;


    const SurveyClass = location.pathname.match(/^\/Survey/)  ? "nav-item active" : "nav-item";
    const AboutMeClass = location.pathname.match(/^\/AboutMe/) ? "nav-item active" : "nav-item";
    const settingsClass = location.pathname.match(/^\/Settings/) ? "nav-item active" : "nav-item";
    const MerchClass = location.pathname.match(/^\/Merch/) ? "nav-item active" : "nav-item";
    const navClass = NavCollapsed ? "collapse" : "";
    const ExpClass = ExperCollapsed ? "collapse" : "";//experimental stuff don't care if anyone sees, but don't want it there on default.

    return (
  <div class = "bs-component">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <img src="..\..\..\..\images\logoNav.png"  class="navbar-brand"/>
            <button class="navbar-toggler" type="button" onClick={this.toggleCollapse.bind(this)}>
              <span class="navbar-toggler-icon">
              <span class="sr-only">Toggle navigation</span>
  <span class="icon-bar"></span>
  <span class="icon-bar"></span>
  <span class="icon-bar"></span></span>
            </button>

            <div class={"navbar-collapse " + navClass} id="navbarColor03">

                <ul class="navbar-nav mr-auto">

                <li class={MerchClass}>
                  <NavLink class="nav-link" activeClassName="nav-link active" to="/Merch">Merch</NavLink>
                </li>
                <li class={AboutMeClass}>
                  <NavLink class="nav-link" activeClassName="nav-link active" to="/AboutMe">About Me</NavLink>
                </li>

            
                  <span class="nav-link"><span>Experimental</span>
                    <div id="experimental" class={""+ExpClass}>
                    <ul class="navbar-nav mr-auto">
                    <li class={settingsClass}>
                      <NavLink class="nav-link" activeClassName="nav-link active" to="/Settings">Suvey Modifier</NavLink>
                      </li>
                      <li class={SurveyClass}>
                        <NavLink class="nav-link" activeClassName="nav-link active" to="/Survey">Survey</NavLink>
                      </li>
                      </ul>
                    </div>
                  </span>


                </ul>

         </div>
      </nav>
    </div>

    );
  }
}
