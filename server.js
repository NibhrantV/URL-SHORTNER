const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const searchQuery = req.query.q || '';

    if (searchQuery) {
        const shortUrls = await ShortUrl.find({ full: { $regex: searchQuery, $options: 'i' } });
        res.render('index', { shortUrls, searchQuery }); // Simplify the object property assignment
    } else {
        const shortUrls = await ShortUrl.find();
        res.render('index', { shortUrls, searchQuery }); // Simplify the object property assignment
    }
});

app.post('/shortUrls', async (req, res) => {
    const fullUrl = req.body.fullUrl;
    const customUrl = req.body.customUrl;

    // Check if the custom URL already exists
    const existingUrl = await ShortUrl.findOne({ short: customUrl });
    if (existingUrl) {
        res.status(400).send('Custom URL already exists!');
        return;
    }

    // Create a new short URL
    const shortUrl = new ShortUrl({
        full: fullUrl,
        short: customUrl || ShortUrl.create({ full: req.body.fullUrl }).short // Generate a random short URL if custom URL is not provided
        // res.redirect('/')
    });
    // app.post('/shortUrls', async (req, res) => {
    //     await 


    //   })

    try {
        await shortUrl.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Failed to create short URL!');
    }
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    if (!shortUrl) {
        res.status(404).send('URL not found!');
        return;
    }

    shortUrl.clicks++;
    await shortUrl.save();

    res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);
