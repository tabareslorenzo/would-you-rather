import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../../actions/questions";
import { Redirect } from "react-router-dom";
import { handleInitialData } from "../../../actions/shared";
class PollTeaser extends Component {

    state = {
        answerOne: "optionOne",
        isRes: false,
        toHome: false,
        question: {
            author: "",
            optionOne: '',
        },
      };

    componentDidMount() {
    this.setState(() => ({
        isRes: this.props.isRes
    }));
    this.props.dispatch(handleInitialData()).then(() => {
        const {questions, location} = this.props
        const {question, answerOne} = this.state;
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
                    optionOne: questions[id][answerOne].text
                } 
            }))
        }
        
        console.log(questions[id]);
        console.log(this.state);
        
        

    })
    
  }
  handleShowRes = e => {
    e.preventDefault();

    const { question } = this.state;
    const { dispatch, id } = this.props;

    //call props func
    //reroute
    this.props.showResult();

    this.setState(() => ({
      toHome: true
    }));
  };
  
  handleSubmit = e => {
    e.preventDefault();

    const { question } = this.state;
    const { dispatch, id } = this.props;

    //call props func
    //reroute
    console.log(this.state.toHome);
    this.props.showQuestion();
    this.setState({
        toHome: true
        
    }, () => {
        
        console.log(this.state.toHome);
    })
    

    
    
  };

  render() {
      
    const {answerOne, answerTwo, question, toHome, isRes } = this.state;
    const { id } = this.props;
    
    return (
      <div>
        <h3 className="center">Would you rather</h3>
        {question && !isRes && <form className="new-tweet" onSubmit={this.handleSubmit}>
            <h4>{question['optionOne']}</h4>
            <h4>or...</h4>
            <button className="btn" type="submit" >
            Answer Poll
            </button>
        </form>}
        {question && isRes && <form className="new-tweet" onSubmit={this.handleShowRes}>
            <h4>{question['optionOne']}</h4>
            <h4>or...</h4>
            <button className="btn" type="submit" >
            Results
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

export default connect(mapStateToProps)(PollTeaser);