import React, { Component } from 'react';
import { connect } from 'react-redux';
import authedUser from '../../reducers/authedUser';
import { handleInitialData } from "../../actions/shared";
import LeaderBoardCard from "./LeaderBoardCard"


class LeaderBoard extends Component {
    state = {
        users: [],
      };

    componentDidMount(){
        console.log(typeof this.users);
        this.props.dispatch(handleInitialData()).then(() => {
            const {users, id, authedUser} = this.props
            let u = [];
            for(const user in users)
            {
                console.log(user);
                u.push(user)
            }
            this.setState(() => ({
                users: u,
            }))
            console.log(typeof u);
            console.log(this.state.users.length > 0);
        })
    }
    render() {

        const {users} = this.state;
        console.log(users.length);
        return (
            <div>
                {users.length > 0 && users.map(user => <LeaderBoardCard id={user}></LeaderBoardCard>)}
            </div>
        );
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        isLoading : authedUser == null,
        users,
        authedUser
    };
}
export default connect(
    mapStateToProps,
)(LeaderBoard);