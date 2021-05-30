import React, { Component } from 'react';
import { connect } from 'react-redux';
import authedUser from '../../reducers/authedUser';
import { handleInitialData } from "../../actions/shared";


class LeaderBoardCard extends Component {
    state = {
        answered: 0,
        createdQuestions: 0
      };
    
    componentDidMount(){
        this.props.dispatch(handleInitialData()).then(() => {
            const {questions, id,authedUser} = this.props
            const {answered, createdQuestions} = this.state;
            console.log(questions)
            const ans = this.numOfAnswered(questions, id);
            const questionsCreated = this.numOfAuthored(questions, id)

            console.log(this.props);
             
            console.log(ans);
            this.setState(() => ({
                answered: ans,
                createdQuestions: questionsCreated
            }))
            console.log(this.state);
        })
    }
    numOfAnswered = (questions, user) => {
        let ans = 0;
        for(let quest in questions)
        {
            console.log(questions[quest]["optionOne"].votes.forEach(
                vote => console.log(vote == user, vote, user)));
            console.log(questions[quest]["optionTwo"].votes.forEach(
                vote => console.log(vote == user, vote, user)));
            if(questions[quest]["optionOne"].votes.filter(
                vote => vote == user).length > 0)
            {
                ans++;
            }
            else if (questions[quest][ "optionTwo"].votes.filter(
                vote => vote == user).length > 0)
            {
                ans++;
            }
            // questions[quest]["optionTwo"].votes.filter(
            //     vote => vote == authedUser).length > 0 || 
            // questions[quest][ "optionTwo"].votes.filter(
            //     vote => vote == authedUser).length > 0 ? ans++ : null;
            
        }
        return ans;
    }
    numOfAuthored = (questions, user) => {
        let created = 0;
        for(let quest in questions)
        {
            if(questions[quest]['author'] === user)
            {
                created++
            }
            
        }
        return created;
    }
    
    render() {
        const {id} = this.props;
        const {answered, createdQuestions} = this.state;
        return (
            <div>
                {!(!answered && !createdQuestions) &&
                    <div>
                        <h2>{id}</h2> 
                        <p>Answered questions {answered}</p> 
                        <p>Created questions {createdQuestions}</p>    
                    </div>
                                
                }
            </div>
            
        );
    }
}

function mapStateToProps({authedUser, questions, users}) {
    return {
        isLoading : authedUser == null,
        questions,
        users,
        authedUser
    };
}
export default connect(
    mapStateToProps,
)(LeaderBoardCard);