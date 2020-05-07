import Koa from "koa";
import KoaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import dotenv from "dotenv";
import giphyApi from "giphy-js-sdk-core";

const app = new Koa();
const router = new KoaRouter();
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
dotenv.config();
const client = giphyApi(`${process.env.GIPHY_API_KEY}`);

const gifRequest = async (query) => {
  const request = await client.search("gifs", { q: query });
  const randomElement =
    request.data[Math.floor(Math.random() * request.data.length)];

  return randomElement.images.downsized_large.url;
};

const errorHandler = (context, error) => {
  context.status = error.status || 500;
  context.body = error.message;
  return context.app.emit("error", error, context);
};

router.get("/", async (context) => {
  try {
    const gif = await gifRequest("chris+farley");
    context.body = `<img src = ${gif}></img>`;
  } catch (error) {
    errorHandler(context, error);
  }
});

router.get("/:search", async (context) => {
  const gif = await gifRequest(context.params.search);
  context.body = `<img src = ${gif}></img>`;
});

app.listen(3000, () => console.log("Server listening on port 3000"));
