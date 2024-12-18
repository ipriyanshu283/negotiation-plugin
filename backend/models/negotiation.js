const mongoose = require("mongoose");

const negotiationSchema = new mongoose.Schema({
  buyerEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true },
  offerAmount: { type: Number, required: true },
  status: { type: String, default: "pending" }, // 'accepted', 'rejected', 'countered'
  counterOffer: { type: Number },
});

const Negotiation = mongoose.model("Negotiation", negotiationSchema);

module.exports = Negotiation;
