import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import Navbar from './components/global-components/navbar';
import Home from './components/home';
import Footer from './components/global-components/footer';
import Welcome from './components/home-components/welcome';
import Signup from './components/home-components/signup';
import Declaration from './components/home-components/declaration';
import DeclarationNext from './components/home-components/declarationNext';
import QRCode from './components/home-components/QRCode';
import TravelProfile from './components/home-components/travelProfile';
import OfficerHome from './components/home-components/officerHome';
import pay from './components/home-components/payment';

class Root extends Component {
    render() {
        return(
            <Router>
                <HashRouter basename="/">
                <div>
               
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Welcome} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/declaration" component={Declaration} />
                    <Route exact path="/declarationNext" component={DeclarationNext} />
                    <Route exact path="/qrcode" component={QRCode} />
                    <Route exact path="/travelProfile" component={TravelProfile} />
                    <Route exact path="/officerHome" component={OfficerHome} />
                    <Route exact path="/pay" component={pay} />
               </Switch>
               
                </div>
                </HashRouter>
            </Router>
        )
    }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('pythoninvestigator'));
