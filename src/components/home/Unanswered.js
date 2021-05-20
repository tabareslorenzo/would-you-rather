import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import UserCard from "../User/UserCard"


class Unanswered extends Component {
    render() {
        const {list} = this.props;
        return (
            <div>
                {list.map(element => 
                    <UserCard id={element} isRes={true}></UserCard>
                )}
                <h1>Unanswered</h1>
                
            </div>
        );
    }
}

function mapStateToProps({ authedUser, questions, users}) {
    return {
      loading: authedUser === null,
      questions,
      users
    }
};

export default connect(
    mapStateToProps,
)(Unanswered);

