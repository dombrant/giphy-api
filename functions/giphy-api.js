const express = require("express");
const dotenv = require("dotenv");
const giphyApi = require("giphy-js-sdk-core");
const serverless = require("serverless-http");

const app = express();
dotenv.config();
const client = giphyApi(`${process.env.GIPHY_API_KEY}`);

const gifRequest = async (query) => {
  const request = await client.search("gifs", { q: query });
  const randomElement =
    request.data[Math.floor(Math.random() * request.data.length)];

  return randomElement.images.downsized_large.url;
};

app.get("/", async (request, response) => {
  try {
    const gif = await gifRequest("chris+farley");
    response.send(`<img src = ${gif}></img>`);
  } catch (error) {
    response.send(`Error: ${error}`);
  }
});

app.get("/:search", async (request, response) => {
  const gif = await gifRequest(request.params.search);
  response.send(`<img src = ${gif}></img>`);
});

app.listen(3000, () => console.log("Server listening on port 3000"));

exports.handler = serverless(app);
