const dotenv = require("dotenv");
const giphyApi = require("giphy-js-sdk-core");

dotenv.config();
const client = giphyApi(`${process.env.GIPHY_API_KEY}`);

const gifRequest = async (query) => {
  const request = await client.search("gifs", { q: query });
  const randomElement =
    request.data[Math.floor(Math.random() * request.data.length)];

  return randomElement.images.downsized_large.url;
};

exports.handler = async (event, context, callback) => {
  try {
    const query = event.queryStringParameters.search || "chris+farley";
    const gif = await gifRequest(query);

    callback(null, {
      statusCode: 200,
      body: gif,
    });
  } catch (error) {
    callback(`Error: ${error}`);
  }
};
