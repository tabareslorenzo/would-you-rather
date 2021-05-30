import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login'


class LoginPage extends Component {
    render() {
        return (
            <div>
                <Login></Login>
            </div>
        );
    }
}

function mapStateToProps({ authedUser}) {
    return {
      loading: authedUser === null
    };
  }

export default connect(
    mapStateToProps,
)(LoginPage);