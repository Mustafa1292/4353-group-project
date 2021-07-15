import React from 'react';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './pages/homepage';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { QuoteForm } from './pages/quote';
import { History } from './pages/history';
import { Profile } from './pages/profile';
import ButtonAppBar from './components/header'
class App extends React.Component {
    constructor(props) {
        super(props);

        // history.listen((location, action) => {
        //     this.props.clearAlerts();
        // });
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <Router history={history}>
                        <ButtonAppBar/>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/login" component={LoginPage} />
                                <Route exact path="/register" component={RegisterPage} />
                                <Route exact path="/quote" component={QuoteForm} />
                                <Route exact path="/history" component={History} />
                                {/* <Redirect exact from="*" to="/login" /> */}
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);
