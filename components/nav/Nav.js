import React, { Component } from 'react';
import { connect } from 'react-redux';
// import authedUser from '../../reducers/authedUser';
import { NavLink } from "react-router-dom";
import {setAuthedUser} from "../../actions/authedUser" 

class Nav extends Component {
    state = {
        users: [],
      };

    logout = () =>
    {
        const { dispatch } = this.props;
        dispatch(setAuthedUser(null));
    }

    render() {


        return (
            <nav className="nav">
              <ul>
                <li>
                  <NavLink to="/" exact activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/newquestion" activeClassName="active">
                    New Question
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/leaderboard" activeClassName="active">
                    LeaderBoard
                  </NavLink>
                </li>
                <li>
                <button onClick={this.logout}>Log out</button> 
                </li>
              </ul>
            </nav>
          );
    }
}

function mapStateToProps({users}) {
    return {
        

    };
}
export default connect(
    mapStateToProps,
)(Nav);