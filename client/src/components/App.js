import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header"
import {Container, createMuiTheme} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import { ThemeProvider } from '@material-ui/styles';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile"
import Payments from "./Payments";

import "../styles/App.scss";
import {makeStyles} from "@material-ui/core/styles";

const Landing = () => <h2>Landing</h2>

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {

        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Header />
                    <Container style={{marginTop: '100px'}}>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/sign-in" component={SignIn} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/payments" component={Payments} />
                    </Container>
                </BrowserRouter>
            </ThemeProvider>
        );
    }

}

export default connect(null, actions)(App);