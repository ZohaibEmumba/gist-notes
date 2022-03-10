import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateGists from "./Components/createGist/CreateGists";
import GithubProfile from "./Components/githubProfile/GithubProfile";
import HomePage from "./Components/homePage/HomePage";
import Login from "./Components/login/Login";
import Navbar from "./Components/navbar/Navbar";
// import ProfilePage from "./Components/ProfilePage/ProfilePage";
import PrivateGists from "./Containers/PrivateGists/PrivateGists";
import PublicGistItem from "./Components/publicGistItem/PublicGistItem";
import PrivateGistItem from "./Components/privateGistItem/PrivateGistItem";
import EditAGist from './Components/editAGist/EditAGist'
import StarredGist from "./Components/starredGists/StarredGists";
import axios from "axios";

export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        uniquePersonRecord : []
      };
       this.handleChange = this.handleChange.bind(this)
    }

   async handleChange (USERNAME) {
      console.log(USERNAME)
        let record = await axios.get(` https://api.github.com/users/${USERNAME}/gists?per_page=10`,{
          username: USERNAME
        }).then(data => this.setState({uniquePersonRecord : data.data}));
    }
  
  render() {
    const {uniquePersonRecord} = this.state;
    return (
      <>
        <Router>
          <Navbar showInputValue={this.handleChange}  />
          <Routes>
            <Route path="/" element={<HomePage personRecords={uniquePersonRecord} />}  />
            <Route path="/login" element={<Login />} />
            <Route path="/profilePage" element={<PrivateGists />} />
            <Route path="/create-a-gist" element={<CreateGists />} />
            <Route path="/getPublicGistItem/" element={<PublicGistItem />} />
            <Route path="/getPrivateGistItem/" element={<PrivateGistItem />} />
            <Route path="/editGist/" element={<EditAGist /> } />
            <Route path="/githubProfile" element={<GithubProfile />} />
            <Route path="/get-stared-gists" element={<StarredGist />} />


          </Routes>
        </Router>
      </>
    );
  }
}
