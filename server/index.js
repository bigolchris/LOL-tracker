const express = require("express");
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "RGAPI-cc4334aa-a312-4b94-aba4-0028715ccdc9";

app.get("/stats", async (req, res) => {
  try {
    const { username } = req.query;
    let response = await axios({
      method: "GET",
      headers: {
        "X-Riot-Token": `${API_KEY}`,
      },
      url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`,
    });
    response = response.data;
    console.log(response);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});
app.get("/ranked", async (req, res) => {
  try {
    const { id } = req.query;
    let response = await axios({
      method: "GET",
      headers: {
        "X-Riot-Token": `${API_KEY}`,
      },
      url: `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
    });
    response = response.data;
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});
app.get("/mastery", async (req, res) => {
  try {
    const { id } = req.query;
    let response = await axios({
      method: "GET",
      headers: {
        "X-Riot-Token": `${API_KEY}`,
      },
      url: `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
    });
    response = response.data;
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
  }
});

app.post("/favorites", (req, res) => {
  const { userId, summonerName } = req.body;
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
