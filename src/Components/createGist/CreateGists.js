import axios from "axios";
import React, { Component } from "react";
import { createAGist } from "../../utils/FetchAPI";
import "./CreateGists.css";

export default class CreateGists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discription: "",
      filename: " ",
      content: " ",
      privacy: null,
    };
    this.creatGist = this.creatGist.bind(this);
  }
  creatGist = async (e) => {
    e.preventDefault();

    if (this.state.filename === "") {
      alert("kindly Enter the discription...");
    } else if (this.state.filename === "") {
      alert("kindly Enter the filename...");
    } else if (this.state.content === "") {
      alert("kindly Enter the Content...");
    } else if (this.state.privacy === null) {
      alert("kindly Enter the Privacy...");
    } else {
      let gistData = {
        description: this.state.discription,
        public: !this.state.privacy,
        files: {
          [this.state.filename]: {
            content: this.state.content,
          },
        },
      };
      const json = JSON.stringify(gistData);
      let create = await createAGist(json);
      window.location = `/profilePage`;
    }
  };

  render() {
    return (
      <section>
        <form className="create-gist">
          <h1 className="create-gist-heading">Create A Gist</h1>
          <input
            type="text"
            onChange={(e) => this.setState({ discription: e.target.value })}
            placeholder="Enter gist Discription..."
          />
          <input
            type="text"
            placeholder="Enter File name..."
            onChange={(e) => this.setState({ filename: e.target.value })}
          />
          <textarea
            name=""
            cols="30"
            rows="10"
            placeholder="Enter File Content..."
            onChange={(e) => this.setState({ content: e.target.value })}
          ></textarea>
          <span>
            <select
              onChange={(e) => {
                if (e.target.value === "public") {
                  this.setState({ privacy: false });
                } else if (e.target.value === "private") {
                  this.setState({ privacy: true });
                } else {
                  return this.state.privacy;
                }
              }}
            >
              <option>Create Gist</option>
              <option value="public"> Public</option>
              <option value="private">Private</option>
            </select>
          </span>

          <button onClick={this.creatGist}>Create Gist</button>
        </form>
      </section>
    );
  }
}
