import express from "express";
import cors from "cors";
import sharp from "sharp";

import {getProperties, getImageUrl, findProperties} from "./data/repository.mjs";

const app = express()
const port = 3000

const PUBLIC_PATH = process.env.NODE_ENV === 'production' ? '/usr/src/app/app/public' : './public'

app.use(
  cors(),
  express.static(PUBLIC_PATH),
  express.json(),
);


app.get('/properties', async (req, res) => {
  try {
    const properties = await getProperties();
    res.send(properties);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/display/', async (req, res) => {
  res.sendStatus(400, 'No ID provided');
})

app.get('/display/:id', async (req, res) => {
  try {
    const imageUrl = await getImageUrl(req.params.id);

    const inBuffer = await fetch(imageUrl[0].image_url).then((response) => response.arrayBuffer());
    const jpegBuffer = await sharp(inBuffer).jpeg().toBuffer();

    res.header('Content-Type', 'image/jpeg');
    res.header('Content-Length', String(jpegBuffer.length));
    res.send(jpegBuffer);
  } catch (err) {
    res.sendStatus(500);
  }
})

app.post('/find', async (req, res) => {
  try {
    const properties = await findProperties(req.body.geometry.coordinates, req.body['x-distance']);
    res.send(properties);
  } catch (err) {
    res.sendStatus(500);
  }
})

app.listen(port, () => {
  console.log(`Zesty express listening ${port}`)
})