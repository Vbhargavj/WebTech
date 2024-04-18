const ShortId = require("shortid");

const URL = require("../models/urlModel");

exports.handlePostRequest = async (req, res) => {
  const shortId = ShortId();

  await URL.create({
    shortId,
    reDirectUrl: req.body.url,
    visitHistory: [],
  });
  res.status(200).json({
    status: "ok",
    shortUrl: shortId,
  });
  console.log(shortId);
};

exports.redirectHandler = async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);

  const url = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  console.log(url.reDirectUrl);
  res.redirect(url.reDirectUrl);
};

exports.analyticsHandler = async (req, res) => {
  const shortId = req.params.shortId;
  const url =await URL.findOne({
    shortId,
  });
  res.status(200).json({
    "status": "ok",
    "main url":url.reDirectUrl,
    "redirected": url.visitHistory.length,
    "visitHistory":url.visitHistory,
  });
};