import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeaderBoard from '../components/leaderboard/LeaderBoard'


class LeaderBoardPage extends Component {
    render() {
        return (
            <div>
                <LeaderBoard></LeaderBoard>
            </div>
        );
    }
}

function mapStateToProps({ authedUser}) {
    return {
      loading: authedUser === null
    };
  }
export default connect(
    mapStateToProps,
)(LeaderBoardPage);