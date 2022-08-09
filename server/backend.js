const express = require('express')

const PORT = process.env.PORT || 3001;

const app = express();

app.post('/favorites', (req, res) => {
    // const {userId, summonerName} = req.body;
    console.log(req.body)
    // console.log(userId, summonerName)
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})