import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "RGAPI-c4ca5993-4988-474c-91d8-05390d96fe71";

  function searchForPlayer(event) {
    let APICallString =
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
      searchText +
      "?api_key=" +
      API_KEY;
    axios
      .get(APICallString)
      .then(function (response) {
        setPlayerData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div className="container">
        <h5>Find Players on League of Legends</h5>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button onClick={(e) => searchForPlayer(e)}>Search for player</button>
      </div>
      {JSON.stringify(playerData) != "{}" ? (
        <>
          <p>{playerData.name}</p>
          <img
            width="100"
            height="100"
            src={
              "http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/" +
              playerData.profileIconId +
              ".png"
            }
          >
            {/* {" "} */}
          </img>
          <p>Summoner Level {playerData.summonerLevel}</p>
        </>
      ) : (
        <>
          <p>No player data</p>
        </>
      )}
    </div>
  );
}

export default App;
