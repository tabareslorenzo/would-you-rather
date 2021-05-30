import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../../actions/questions";
import { Redirect } from "react-router-dom";
import { handleInitialData } from "../../../actions/shared";

class PollResult extends Component {

    state = {
        answerOne: "optionOne",
        answerTwo: "optionTwo",
        question: {
            author: "",
            optionOne: '',
            optionTwo: '',
        },
        AuthUserChoice: "",
        optionOneVotes: [],
        optionTwoVotes: []
      };

    componentDidMount() {
    this.props.dispatch(handleInitialData()).then(() => {
        const {questions, id, authedUser} = this.props
        const {answerOne, answerTwo, optionOneVotes, optionTwoVotes, AuthUserChoice, question} = this.state;
        const arr = questions[id][answerOne].votes.filter(vote => vote === authedUser)
        this.setState(() => ({
            question: {
                author: questions[id]['author'],
                optionOne: questions[id][answerOne].text,
                optionTwo: questions[id][answerTwo].text
            },
            AuthUserChoice: arr.length === 0 ? answerTwo : answerOne,
            optionOneVotes: questions[id][answerOne].votes,
            optionTwoVotes: questions[id][answerTwo].votes
        }))
        console.log(AuthUserChoice);
        // console.log(questions[id][answerOne].votes);
    })
    
  }
  
  handleSubmit = e => {
    e.preventDefault();

    const { question } = this.state;
    const { dispatch, id } = this.props;

    //reroute to unanswered questions

    this.setState(() => ({
      toHome: true
    }));
  };
  render() {
      
    const {answerOne, answerTwo, optionOneVotes, optionTwoVotes, AuthUserChoice, question, toHome} = this.state;

    if(toHome)
    {
        return <Redirect push to='/' />;
    }
    return (
      <div>
        <h3 className="center">Would you rather</h3>
        {AuthUserChoice !== '' && <div className="new-tweet">
            <h4>{question[answerOne]}</h4>{AuthUserChoice === answerOne && <h3>Your Choice</h3> }
            <h4>{optionOneVotes.length} out of {optionOneVotes.length + optionTwoVotes.length} votes</h4>
            <h4>{question[answerTwo]}</h4>{AuthUserChoice === answerTwo && <h3>Your Choice</h3> }
            <h4>{optionTwoVotes.length} out of {optionOneVotes.length + optionTwoVotes.length} votes</h4>
            <button className="btn" onClick={this.handleSubmit} >
            Back
            </button>
        </div>}
      </div>
    );
  }
}


function mapStateToProps({ authedUser, questions}) {
    return {
      loading: authedUser === null,
      questions,
      authedUser
    }
};

export default connect(mapStateToProps)(PollResult);