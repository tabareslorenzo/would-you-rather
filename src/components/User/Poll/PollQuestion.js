import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../../actions/questions";
import { Redirect } from "react-router-dom";
import { handleInitialData } from "../../../actions/shared";

class PollQuestion extends Component {

    state = {
        answerOne: "optionOne",
        answerTwo: "optionTwo",
        question: {
            author: "",
            optionOne: '',
            optionTwo: ''
        },
        isoptionOne: false,
        toHome: false
      };

    componentDidMount() {
    this.props.dispatch(handleInitialData()).then(() => {
        const {questions, location} = this.props
        const {question} = this.state;

        let {id} = this.props
        
       
        if(id === undefined && location != null )
        {
            console.log(typeof location.pathname);
            console.log(location.pathname.substring(11));

            console.log(location);
            id = location.pathname.substring(11)
        }
        console.log(questions);
        console.log(id);
        if(id != null)
        {
            this.setState(() => ({
                question: {
                    author: questions[id]['author'],
                    optionOne: questions[id][this.state.answerOne].text,
                    optionTwo: questions[id][this.state.answerTwo].text
                } 
            }))
        }
        
        console.log(questions[id]);
        console.log(this.state);
    })
    
  }
  
  handleChange = e => {
    const value = e.target.value;
    const { isoptionOne, answerOne, answerTwo } = this.state;
    console.log(value)
    if(value == answerOne)
    {
        this.setState(() => ({
            ...this.state,
            isoptionOne: true
          }));
    }
    if(value == answerTwo)
    {
        this.setState(() => ({
            ...this.state,
            isoptionOne: false
          }));
    }
    
  };
  handleSubmit = e => {
    e.preventDefault();

    const { isoptionOne, answerOne, answerTwo, question } = this.state;
    const { dispatch, id } = this.props;

        // add answer
    console.log(this.state);
    if(isoptionOne)
    {
        dispatch(handleAddAnswer({
            qid: id,
            answer: answerOne,
      
          }));
    }
    else 
    {
        dispatch(handleAddAnswer({
            qid: id,
            answer: answerTwo,
      
          }));
    }
    
    this.props.showResult();
    // this.setState(() => ({
    //   toHome: id ? false : true
    // }));
  };
  render() {
      
    const {answerOne, answerTwo, question, toHome } = this.state;

    return (
      <div>
        <h3 className="center">Answer Poll</h3>
        {question.author !== '' && <form className="new-tweet" onSubmit={this.handleSubmit}>
        <div>
            <input 
            type="radio" 
            id={answerOne} 
            name="answers" 
            value={answerOne}
            onChange={this.handleChange}
            />
            <label for={answerOne}>{question[answerOne]}</label>
        </div>

        <div>
            <input type="radio" 
            id={answerTwo} 
            name="answers" 
            value={answerTwo}
            onChange={this.handleChange}
            />
            <label for={answerTwo}>{question[answerTwo]}</label>
        </div> 
          
          <button className="btn" type="submit" disabled={
            answerOne  === "" &&
            answerTwo === ""
            }>
            Submit
          </button>
        </form>}
      </div>
    );
  }
}


function mapStateToProps({ authedUser, questions}) {
    return {
      loading: authedUser === null,
      questions
    }
};

export default connect(mapStateToProps)(PollQuestion);