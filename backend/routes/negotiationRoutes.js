const express = require("express");
const { createNegotiation, respondToOffer } = require("../controllers/negotiationController");

const router = express.Router();

router.post("/offer", createNegotiation);
router.post("/response/:id", respondToOffer);

module.exports = router;
