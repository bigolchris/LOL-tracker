import React, { useContext } from "react";
import { AuthContext } from "./login"
import axios from "axios";
import { setDatabase, set, ref } from "./firebase";


export const PlayerCard = ({
  summonerName,
  summonerLevel,
  mastery,
  soloQStats,
  soloWinRate,
  flexWinRate,
  flexStats,
  setFavorites
}) => {
  const context = useContext(AuthContext)
  let totalMastery = mastery.reduce((acc,cuv) => {
   return acc + cuv.championPoints
  }, 0)
  // const body = {userId:context.currentUser.uid, summonerName:summonerName}
  const addFavorites = () => {
    // console.log(body)
    // axios.post('/favorites', body)

    setFavorites(prev => [...prev, summonerName]);
  }
  return (
        <div className={"cardContainer"}>
        <div className={"summonerStats"}>
          <h1> {summonerName}</h1>
          <h2> Level: {summonerLevel}</h2>
          <h2> Total Champion Mastery : {totalMastery} </h2>
        </div>

        <div className={"soloStats"}>
          <h2>Solo Stats</h2>
          <p>
            Division : {soloQStats.tier} {soloQStats.rank}
          </p>
          <p>League Points : {soloQStats.leaguePoints}</p>
          <p>
            Wins {soloQStats.wins} / Losses {soloQStats.losses}
          </p>
          <p>Win Rate {soloWinRate}</p>
        </div>
        {flexStats.tier ? 
        <div className={"flexStats"}>
          <h2>Flex 5v5 Stats</h2>
          <p>
            Division: {flexStats.tier === null ? "noflex" : flexStats.tier} {flexStats.rank}
          </p>
          <p>League Points : {flexStats.leaguePoints} LP</p>
          <p>
            Wins {flexStats.wins} / Losses {flexStats.losses}
          </p>
          <p>Win Rate {flexWinRate}</p>
        </div> : <h2>Flex Stats Unavailable</h2>}
        <button className="favorite-btn" onClick={() => addFavorites(setFavorites)}>🤍</button>
        </div>
    
  );
};

