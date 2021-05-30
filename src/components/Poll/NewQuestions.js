import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuections extends Component {
  state = {
    answerOne: "",
    answerTwo: "",
    toHome: false
  };
  handleChange = e => {
    const value = e.target.value;

    this.setState(() => ({
      ...this.state,
      [e.target.name]: value
    }));
  };
  handleSubmit = e => {
    e.preventDefault();

    const { answerOne, answerTwo } = this.state;
    const { dispatch, authedUser } = this.props;
    // _saveQuestionAnswer ({ authedUser, qid, answer })

    dispatch(handleAddQuestion({
      author: authedUser,
      optionOneText: answerOne,
      optionTwoText: answerTwo,

    }));


    this.setState(() => ({
      answerOne: "",
      answerTwo: "",
      toHome: true
    }));
  };
  render() {
    const {answerOne, answerTwo, toHome } = this.state;
    if(toHome)
    {
        return <Redirect push to='/' />;
    }
    return (
      <div>
        <h3 className="center">Compose new Question</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
            <label>
            Answer One
            <input
            type="text"
            name="answerOne"
            value={answerOne}
            onChange={this.handleChange}
            />
        </label>
        <label>
            Answer Two
            <input
            type="text"
            name="answerTwo"
            value={answerTwo}
            onChange={this.handleChange}
            />
        </label> 
          
          <button className="btn" type="submit" disabled={
            answerOne  === "" ||
            answerTwo === ""
            }>
            Submit
          </button>
        </form>
      </div>
    );
  }
}


function mapStateToProps({ authedUser}) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(NewQuections);