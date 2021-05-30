import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../actions/questions";
import { handleInitialData } from "../../actions/shared";
import PollQuestion from "./Poll/PollQuestion"
import PollResult from "./Poll/PollResult"
import PollTeaser from "./Poll/PollTeaser"
import { Redirect } from "react-router-dom";

class UserCard extends Component {

    state = {
        isQuestion: false,
        isTeaser: true,
        isResult: false,
        author: ''
      };
      
    componentDidMount() {
    if(this.props.location)
    {
        console.log("property_id",this.props.location.state);
        this.setState(() => ({
            isQuestion: this.props.location.state.isQuestion,
            isTeaser: this.props.location.state.isTeaser,
            isResult: this.props.location.state.isResult,
        }))
    }
    
    this.props.dispatch(handleInitialData()).then(() => {
        const {questions, users, isRes, location} = this.props
        
        let {id} = this.props
        console.log(questions);
        const {question} = this.state;
       
        if(id === undefined && location != null )
        {
            console.log(typeof location.pathname);
            console.log(location.pathname.substring(11));

            console.log(location);
            id = location.pathname.substring(11)
        }
        console.log(id);
        this.setState(() => ({
            author: users[questions[id]['author']]['name']
        }))
        console.log(this.state);
       
    })
    
  }
  showQuestion = () => {
    this.setState(() => ({
        isQuestion: true,
        isTeaser: false,
        isResult: false
    }));
  };

  showTeaser = () => {
    this.setState(() => ({
        isQuestion: false,
        isTeaser: true,
        isResult: false
    }));
};

showResult = () => {
    this.setState(() => ({
        isQuestion: false,
        isTeaser: false,
        isResult: true
    }));
}
    
  render() {
      
    const {isQuestion, isTeaser, isResult, author } = this.state;
    const {isRes, id} = this.props;
    if (!isTeaser && !isRes) {

        console.log(this.props);
        if(id != null)
        {
            return <Redirect
            to={{
            pathname: `/questions/${id}`,
            state: {
                isQuestion: true,
                isTeaser: false,
                isResult: false,
                author: ''
              }
          }}
        />
        }

        
    }
    else if (!isTeaser && isRes) {

        console.log(this.props);
        if(id != null)
        {
            return <Redirect
            to={{
            pathname: `/questions/${id}`,
            state: {
                isQuestion: false,
                isTeaser: false,
                isResult: true,
                author: ''
              }
          }}
        />
        }
        
    }

    return (
      <div>
        {author !=='' && <h3 className="center">{author} asks: </h3>}
        {isQuestion && <PollQuestion showResult={this.showResult} id={this.props.location.pathname.substring(11)}></PollQuestion>}
        {isTeaser && <PollTeaser isRes={isRes} showQuestion={this.showQuestion} showResult={this.showResult} id={this.props.id}></PollTeaser>}
        {isResult && <PollResult id={this.props.location.pathname.substring(11)}></PollResult>}
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

export default connect(mapStateToProps)(UserCard);