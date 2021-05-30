import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UserCard from "../User/UserCard"

class Answered extends Component {
  state = {
    answered: [],
    unanswered: [],
    answerOne: "optionOne",
    answerTwo: "optionTwo",
    isAnswered: false
    // toHome: false
  };
  componentDidMount() {
    
  }
  


  render() {
    const {isAnswered, answered, unanswered} = this.state;
    const {list} = this.props;

    return (
      <div>
        {list.map(element => 
            <UserCard id={element} isRes={false}></UserCard>
        )}
       <h1>Answered</h1>
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

export default connect(mapStateToProps)(Answered);