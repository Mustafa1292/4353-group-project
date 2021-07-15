import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { history } from "../helpers";

class HomePage extends React.Component {
  render() {
    const { user, users, logout } = this.props;
    return (
      <div>
        <h1>FuelsCo</h1>

        <h3>Hello, {user?.username || "guest"}</h3>


        <p>
          {user?.username ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <span style={{marginLeft: 10}}>
              <Link to="/register">Register</Link>
              </span>
            </>
          )}
        </p>

        <pre>{JSON.stringify(user, undefined, 2)}</pre>

        {/* <button onClick={() => {history.push({pathname: '/profile'})}}>Test route change</button> */}
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
  deleteUser: userActions.delete,
  logout: userActions.logout,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
