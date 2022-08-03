import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import ReactDom from "react-dom/client";
import "./App.css";
import { PlayerCard } from "./PlayerCard";

const API_KEY = "RGAPI-95a6c95b-690a-46c7-8cfd-ed864d0d4984";

const Main = () => {
  const [name, setName] = useState("");
  const [puuid, setPuuid] = useState("");
  const [accId, setAccId] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [winRateSolo, setWinRateSolo] = useState(0);
  const [winRateFlex, setWinRateFlex] = useState(0);
  const [summonerLvL, setSummonerLvL] = useState(0);
  const [id, setId] = useState(null);
  const [totalMastery, setTotalMastery] = useState(0);
  //   const [region, setRegion] = useState("na1.api.riotgames.com");
  // const history = useHistory();
  const [flexStats, setFlexStats] = useState({
    tier: "",
    rank: "",
    leaguePoints: 0,
    hotStreak: false,
    wins: 0,
    losses: 0,
  });
  const [soloQstats, setSoloQstats] = useState({
    tier: "",
    rank: "",
    leaguePoints: 0,
    hotStreak: false,
    wins: 0,
    losses: 0,
  });

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {}, [totalMastery]);

  useEffect(() => {
    setWinRateFlex(
      Math.floor((flexStats.wins / (flexStats.wins + flexStats.losses)) * 100) +
        "%"
    );
    setWinRateSolo(
      Math.floor(
        (soloQstats.wins / (soloQstats.wins + soloQstats.losses)) * 100
      ) + "%"
    );
  }, [soloQstats, flexStats]);

  const getStats = (url) => {
    fetch(url, {
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
        setPuuid(data.puuid);
        setSummonerLvL(data.summonerLevel);
        setAccId(data.accountId);
        setId(data.id);
        setIsAvailable(true);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setIsAvailable(false);
      });
  };

  const handleGetSummoner = (e) => {
    e.preventDefault();
    getStats(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`
    );
  };

  useEffect(() => {
    if (id !== null) {
      getMastery(
        `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`
      );
      getRankedStats(
        `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`
      );
    }
  }, [id]);

  const getMastery = (url) => {
    fetch(url, {
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
        setTotalMastery(data);
        
      })
      .catch((err) => {
        console.log(err);
        setIsAvailable(false);
      });
  };

  const getRankedStats = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        "X-Riot-Token": `${API_KEY}`,
      },
    })
      .then((resp) => {
        console.log(resp)
        return resp.json();
        
      })
      .then((data) => {
        const newFlexStats = {
          Tier: data[1].tier,
          rank: data[1].rank,
          leaguePoints: data[1].leaguePoints,
          wins: data[1].wins,
          losses: data[1].losses,
        };
        setFlexStats(newFlexStats);
        console.log(newFlexStats);

        const newRankedStats = {
          Tier: data[0].tier,
          rank: data[0].rank,
          leaguePoints: data[0].leaguePoints,
          wins: data[0].wins,
          losses: data[0].losses,
        };
        
        setSoloQstats(newRankedStats);
        console.log(newRankedStats);
      })
      .catch((err) => {
        console.log(err);
        setIsAvailable(false);
      });
  };

  if (id !== null)
    return (
      <PlayerCard
        summonerName={name}
        summonerLevel={summonerLvL}
        mastery={totalMastery}
        soloTier={soloQstats.tier}
        soloWins={soloQstats.wins}
        soloLoss={soloQstats.losses}
        soloPoints={soloQstats.leaguePoints}
        soloRank={soloQstats.rank}
        soloWinRate={winRateSolo}
        flexTier={flexStats.tier}
        flexWins={flexStats.wins}
        flexLoss={flexStats.losses}
        flexPoints={flexStats.leaguePoints}
        flexRank={flexStats.rank}
        flexWinRate={winRateFlex}
      />
    );

  return (
    <>
      <div className={"main-header"}>
        <div className={"headerWrapper"}>
          <h1 className={"headerWrapper_title"}>Search For League Players!</h1>
          <h2 className={"headerWrapper_gretting"}>Enjoy!</h2>
        </div>
      </div>
      <div className={"main_body"}>
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
              onClick={handleGetSummoner}
              type={"submit"}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Main;