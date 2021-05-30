import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Answered from "../components/home/Answered";
import Unanswered from "../components/home/Unanswered"

class Home extends Component {
  state = {
    answered: [],
    unanswered: [],
    answerOne: "optionOne",
    answerTwo: "optionTwo",
    isAnswered: true
    // toHome: false
  };
  componentDidMount() {
    this.props.dispatch(handleInitialData()).then(() => {
        const {questions, id, users, authedUser} = this.props
        const {question, answerOne, answerTwo, answered, unanswered} = this.state;
        console.log(questions)
        let ans = [];
        let una = [];
        //     );
        console.log(this.props);
        for(let quest in questions)
        {
            console.log(questions[quest][answerTwo].votes.forEach(
                vote => console.log(vote == authedUser, vote, authedUser)));
            questions[quest][answerOne].votes.filter(
                vote => vote == authedUser).length > 0 || 
            questions[quest][answerTwo].votes.filter(
                vote => vote == authedUser).length > 0 ? ans.push(quest) : una.push(quest)
            
        }
        
        console.log(ans);
        console.log(una);
        this.setState(() => ({
            // author: users[questions[id]['author']]['name'],
            answered: una,
            unanswered: ans,

        }))
        console.log(this.state);
    })
    
  }
  

  isAnswered = () => {
    this.setState(() => ({
        isAnswered: true
    }));
  }

  isUnanswered = () => {
    this.setState(() => ({
        isAnswered: false
    }));
  }

  render() {
    const {isAnswered, answered, unanswered} = this.state;

    return (
      <div>
        <button onClick={this.isAnswered}>Unanswered</button> <button onClick={this.isUnanswered}>Answered</button>
        {isAnswered && <Answered list={answered} ></Answered>}
        {!isAnswered && <Unanswered list={unanswered} ></Unanswered>}
      </div>
    );
  }
}
function mapStateToProps({ authedUser, questions, users}) {
    return {
      loading: authedUser === null,
      questions,
      users,
      authedUser
    }
};
  
  export default connect(mapStateToProps)(Home);