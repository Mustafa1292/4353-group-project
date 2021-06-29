import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './pages/homepage';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { QuoteForm } from './pages/quote';
import { History } from './pages/history';


class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <Router history={history}>
                            <Switch>
                                <Route path="/profile" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/quote" component={QuoteForm} />
                                <Route path="/history" component={History} />
                                <Redirect from="*" to="/" />
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
