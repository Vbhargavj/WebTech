const express = require("express");
const contactControler = require("../controller/contactController");
const router = express.Router();

router.get("/contacts", contactControler.getContactList);
router.post("/contact", contactControler.createContact);
router.patch("/contact/:id", contactControler.updateContact);
router.delete("/contacts/:id", contactControler.deleteContact);
module.exports = router;
