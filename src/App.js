// import React, { Component } from "react";
// import { createRoot } from "react-dom/client";
// import { ReactDOM } from "react";
// import Main from "./main";
// import {
//   HashRouter,
//   Route,
//   Link,
//   Switch,
//   NavLink,
//   useHistory,
// } from "react-router-dom";
// import { PlayerCard } from "./PlayerCard";

// const App = () => {
//   return (
//     <HashRouter>
//       <>
//         <Route exact path="/" component={Main} />
//         <Route path="/summoner" component={PlayerCard} />
//       </>
//     </HashRouter>
//   );
// };

// ReactDOM.createRoot(<App />, document.getElementById("app"));

// function searchForPlayer(event) {
//   let APICallString =
//     "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
//     searchText +
//     "?api_key=" +
//     API_KEY;
//   axios
//     .get(APICallString)
//     .then(function (response) {
//       setPlayerData(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }

// return (
//   <div className="App">
//     <div className="container">
//       <h5>Find Players on League of Legends</h5>
//       <input
//         type="text"
//         onChange={(e) => setSearchText(e.target.value)}
//       ></input>
//       <button onClick={(e) => searchForPlayer(e)}>Search for player</button>
//     </div>
//     {JSON.stringify(playerData) != "{}" ? (
//       <>
//         <p>{playerData.name}</p>
//         <img
//           width="100"
//           height="100"
//           src={
//             "http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/" +
//             playerData.profileIconId +
//             ".png"
//           }
//         >
//           {/* {" "} */}
//         </img>
//         <p>Summoner Level {playerData.summonerLevel}</p>
//       </>
//     ) : (
//       <>
//         <p>No player data</p>
//       </>
//     )}
//   </div>
// );
// export default App;
