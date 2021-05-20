import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from "../actions/shared";
import {setAuthedUser} from "../actions/authedUser"

class Login extends Component {
    state = {
        usersIds: [],
        users: {},
        selected: ''

    };
    componentDidMount()
    {
        this.props.dispatch(handleInitialData()).then(() => {
            const {users, id, authedUser} = this.props
            let u = [];
            let userObj = {};
            for(const user in users)
            {
                console.log(user);
                u.push(user)
                userObj[user] = users[user]['avatarURL']
            }
            this.setState(() => ({
                usersIds: u,
                users: userObj
            }))
            console.log(this.state.users.length > 0);
        })
    }

    handleChange = e => {
        console.log(e.target.value);
        this.setState(() => ({
            selected: e.target.value
        }));
    }
    handleSubmit = e => {
        e.preventDefault();

        const { selected } = this.state;
        const { dispatch, authedUser } = this.props;
        // _saveQuestionAnswer ({ authedUser, qid, answer })

        dispatch(setAuthedUser(selected));

        this.setState(() => ({
        }));
    };
    render() {
        const {usersIds} = this.state;
        return (
            <div>
                {usersIds.length > 0 && 
                    <div>
                        <h4>Welcome to the Would You Rather App!</h4>
                        <p>Please sign in to continue</p>
                        <h2>Sign In</h2>
                        <form  className="new-tweet" onSubmit={this.handleSubmit}> 
                            <select name="users" id="users" onChange={this.handleChange}>
                                <option value="" disabled selected>Select a User</option>
                                {usersIds.map(userId => <option value={userId}>{userId}</option>)}
                            </select>
                            <button type="submit">Login In</button>
                        </form>
                    </div>
                }
                
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

export default connect(
    mapStateToProps,
)(Login);