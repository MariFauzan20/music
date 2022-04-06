import axios from "axios";
import React, { Component } from "react";

export default class SeacrhBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  handleInputKeyword(e) {
    this.setState({ keyword: e.target.value });
  }

  async handleButtonSearch(e) {
    e.preventDefault();

    const keyword = this.state.keyword;
    const accessToken = (state) => ({ accessToken: state.auth.accessToken });

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SPOTIFY_BASE_URL}/search`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: keyword,
            type: "track",
          },
        }
      );
      this.props.successSearch(response.data.tracks.items);
    } catch (error) {
      console.error({ error: error.message });
    }
  }

  render() {
    return (
      <form className="mt-4" onSubmit={(e) => this.handleButtonSearch(e)}>
        <input
          className="me-1"
          type="text"
          onChange={(e) => this.handleInputKeyword(e)}
        />
        <button className="btn btn-primary btn-sm" type={"submit"}>
          Search
        </button>
      </form>
    );
  }
}
