import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import ReactDom from "react-dom/client";
import "./App.css";
import { PlayerCard } from "./PlayerCard";
import { Favorites } from "./Favorites";

const API_KEY = "RGAPI-d69bab3c-b353-4538-9971-6c74dcb7d169";

const Main = () => {
  const [summoners, setSummoners] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [name, setName] = useState("");

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const getStats = async (url, newSummoner) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": `${API_KEY}`,
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        newSummoner.puuid = data.puuid;
        newSummoner.summonerLvL = data.summonerLevel;
        newSummoner.accId = data.accountId;
        newSummoner.id = data.id;
        newSummoner.isAvailable = true;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        newSummoner.isAvailable = false;
      });
  };

  const getMastery = async (url, newSummoner) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": `${API_KEY}`,
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        newSummoner.totalMastery = data;
      })
      .catch((err) => {
        console.log(err);
        newSummoner.isAvailable = false;
      });
  };

  const getRankedStats = async (url, newSummoner) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": `${API_KEY}`,
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        if (data.length > 1) {
          const newFlexStats = {
            tier: data[1].tier,
            rank: data[1].rank,
            leaguePoints: data[1].leaguePoints,
            wins: data[1].wins,
            losses: data[1].losses,
          };
          newSummoner.flexStats = { ...newFlexStats };
          newSummoner.flexWinRate =
            Math.floor(
              (newFlexStats.wins / (newFlexStats.wins + newFlexStats.losses)) *
                100
            ) + "%";
        } else {
          newSummoner.flexStats = {
            tier: "",
            rank: "",
            leaguePoints: 0,
            hotStreak: false,
            wins: 0,
            losses: 0,
          };
        }
        const newRankedStats = {
          tier: data[0].tier,
          rank: data[0].rank,
          leaguePoints: data[0].leaguePoints,
          wins: data[0].wins,
          losses: data[0].losses,
        };
        newSummoner.soloQStats = { ...newRankedStats };
        newSummoner.soloWinRate =
          Math.floor(
            (newRankedStats.wins /
              (newRankedStats.wins + newRankedStats.losses)) *
              100
          ) + "%";
      })
      .catch((err) => {
        console.log(err);
        newSummoner.isAvailable = false;
      });
  };

  const handleGetSummoner = async (e, name) => {
    e.preventDefault();

    let newSummoner = {
      name: "",
      puuid: "",
      accId: "",
      isAvailable: null,
      soloWinRate: 0,
      flexWinRate: 0,
      summonerLvL: 0,
      id: null,
      totalMastery: [],
      flexStats: {
        tier: "",
        rank: "",
        leaguePoints: 0,
        hotStreak: false,
        wins: 0,
        losses: 0,
      },
      soloQStats: {
        tier: "",
        rank: "",
        leaguePoints: 0,
        hotStreak: false,
        wins: 0,
        losses: 0,
      },
    };

    await getStats(
      `http://localhost:3001/stats?username=${name}`,
      newSummoner
    );
    await getMastery(
      `http://localhost:3001/mastery?id=${newSummoner.id}`,
      newSummoner
    );
    await getRankedStats(
      `http://localhost:3001/ranked?id=${newSummoner.id}`,
      newSummoner
    );
    newSummoner.name = name;
    setSummoners((prev) => [...prev, newSummoner]);
  };

  return (
    <div className="main">
      <div className={"main-header"}>
        <div className={"headerWrapper"}>
          <h1 className={"headerWrapper_title"}>Search For League Players!</h1>
          {/* <h2 className={"headerWrapper_gretting"}>Enjoy!</h2> */}
          <form className={"formWrapper_form"}>
            <div className={"formWrapper_1st-row row"}>
              <input
                className={"formWrapper_name"}
                type={"text"}
                placeholder={"Summoner name"}
                onChange={handleSetName}
              />
            </div>
            <div className={"formWrapper_2nd-row row"}>
              <button
                className={"formWrapper_btn-submit"}
                onClick={(e) => handleGetSummoner(e, name)}
                type={"submit"}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={"main_body"}>
        <div className="card-wrapper">
          {summoners.length > 0
            ? summoners.map((summoner, index) => {
                return (
                  <PlayerCard
                    summonerName={summoner.name}
                    summonerLevel={summoner.summonerLvL}
                    mastery={summoner.totalMastery}
                    soloQStats={summoner.soloQStats}
                    soloWinRate={summoner.soloWinRate}
                    flexWinRate={summoner.flexWinRate}
                    flexStats={summoner.flexStats}
                    setFavorites={setFavorites}
                    key={index}
                  />
                );
              })
            : null}
        </div>
        <div className="favorites-container"></div>
        <Favorites favorites={favorites} getSummoner={handleGetSummoner}></Favorites>
      </div>
    </div>
  );
};
export default Main;