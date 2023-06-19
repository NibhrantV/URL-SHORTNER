const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const searchQuery = req.query.q || "";

  try {
    const shortUrls = await ShortUrl.aggregate([
        {
          $search: {
            index: 'note',
            text: {
              query: searchQuery,
              path: ['full', 'note']
            }
          }
        }
      ]);  
    const allUrls = await ShortUrl.find();
    res.render("index", { shortUrls, allUrls, searchQuery });
  } catch (error) {
    res.status(500).send("Failed to fetch short URLs!");
  }
});

app.post("/shortUrls", async (req, res) => {
  const fullUrl = req.body.fullUrl;
  const customUrl = req.body.customUrl;
  const note = req.body.note;

  try {
    const existingUrl = await ShortUrl.findOne({ full: fullUrl });
    if (existingUrl) {
      res.status(500).send("URL already exists!");
      return;
    }
    const existingCusotmUrl = await ShortUrl.findOne({ short: customUrl });
    if (existingCusotmUrl) {
      res.status(400).send("Custom URL already exists!");
      return;
    }
    const shortUrl = new ShortUrl({
      full: fullUrl,
      short: customUrl || shortId.generate(),
      note: note,
    });
    await shortUrl.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to create short URL!");
  }
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (!shortUrl) {
    res.status(404).send("URL not found!");
    return;
  }

  shortUrl.clicks++;
  await shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);
