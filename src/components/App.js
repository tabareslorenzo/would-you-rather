import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import NewQuestions from "./Poll/NewQuestions"
import PollQuestion from "./User/Poll/PollQuestion"
import Usercard from "./User/UserCard"
import Home from "../Pages/Home"
import LeaderBoardPage from "../Pages/LeaderBoardPage"
import LoginPage from "../Pages/LoginPage"
import Nav from "./nav/Nav"
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className="App">
      <header className="App-header">
      <Router>
        <Fragment>
          <div className="container">
            <Nav />
            {this.props.loading === true ? (<LoginPage></LoginPage>) : (
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/leaderboard" component={LeaderBoardPage} />
                <Route path="/newquestion" component={NewQuestions} />
                <Route path="/questions/:id" render={(props) => <Usercard {...props}/>}/>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
      </header>
    </div>
    );
  }
}

function mapStateToProps({ authedUser}) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
