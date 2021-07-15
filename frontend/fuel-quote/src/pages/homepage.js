import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import {history} from "../helpers";

class HomePage extends React.Component {
    render() {
        const { user, users } = this.props;
        return (
            <div>
                <h1>FuelsCo</h1>

                <h3>Hello, {user?.name || "guest"}</h3>

                <p>
                    <Link to="/login">Logout</Link>
                </p>

                <button onClick={() => {history.push({pathname: '/profile'})}}>Test route change</button>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };