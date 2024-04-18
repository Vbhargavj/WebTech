const express = require("express");
const {
  handlePostRequest,
  redirectHandler,
  analyticsHandler
} = require("../Controllers/urlControllers");

const router = express.Router();

router.route("/url").post(handlePostRequest);
router.get("/:shortId", redirectHandler);
router.get("/analytic/:shortId",analyticsHandler);

module.exports = router;
