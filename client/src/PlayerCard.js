import React, { useContext } from "react";
import { AuthContext } from "./login"
import axios from "axios";


export const PlayerCard = ({
  summonerName,
  summonerLevel,
  mastery,
  soloTier,
  soloWins,
  soloLoss,
  soloPoints,
  soloRank,
  soloWinRate,
  flexTier,
  flexWins,
  flexLoss,
  flexRank,
  flexPoints,
  flexWinRate,
  
}) => {
  const context = useContext(AuthContext)
  console.log(context.currentUser.uid)
  let totalMastery = mastery.reduce((acc,cuv) => {
   return acc + cuv.championPoints
  }, 0)
  const addFavorites = () => {
    axios.post('/favorites', {userId:context.currentUser.uid, summonerName:summonerName})
  }
  return (
    <>
      <div className={"cardWrapper"}>
        <div className={"summonerStats"}>
          <h1> Name: {summonerName}</h1>
          <h2> Level: {summonerLevel}</h2>
          <h2> Total Champion Mastery : {totalMastery} </h2>
        </div>

        <div className={"soloStats"}>
          <h2>Solo Stats</h2>
          <p>
            Division : {soloTier} {soloRank}
          </p>
          <p>League Points : {soloPoints}</p>
          <p>
            Wins {soloWins} / Losses {soloLoss}
          </p>
          <p>Win Rate {soloWinRate}</p>
        </div>
        <div className={"flexStats"}>
          <h2>Flex 5v5 Stats</h2>
          <p>
            Division: {flexTier} {flexRank}
          </p>
          <p>League Points : {flexPoints} LP</p>
          <p>
            Wins {flexWins} / Losses {flexLoss}
          </p>
          <p>Win Rate {flexWinRate}</p>
        </div>
      </div>
      <button className="favorite-btn" onClick={() => addFavorites()}>Favorite</button>
    </>
  );
};
