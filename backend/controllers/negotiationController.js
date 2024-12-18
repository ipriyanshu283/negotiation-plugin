const Negotiation = require("../models/negotiation");
const sendEmail = require("../utils/email");

const createNegotiation = async (req, res) => {
  const { buyerEmail, sellerEmail, offerAmount } = req.body;

  try {
    const negotiation = new Negotiation({ buyerEmail, sellerEmail, offerAmount });
    await negotiation.save();
    res.status(201).json(negotiation);

    // Send email to seller and buyer
    await sendEmail(buyerEmail, "New Negotiation", `Offer of ${offerAmount} has been made.`);
    await sendEmail(sellerEmail, "New Negotiation", `You have received an offer of ${offerAmount}.`);

  } catch (err) {
    res.status(500).json({ message: "Error creating negotiation", error: err });
  }
};

const respondToOffer = async (req, res) => {
  const { id } = req.params;
  const { status, counterOffer } = req.body;

  try {
    const negotiation = await Negotiation.findById(id);
    if (!negotiation) return res.status(404).json({ message: "Negotiation not found" });

    negotiation.status = status;
    if (status === "countered") negotiation.counterOffer = counterOffer;

    await negotiation.save();
    res.status(200).json(negotiation);

    // Send email based on status
    let emailSubject = "";
    let emailMessage = "";

    if (status === "accepted") {
      emailSubject = "Negotiation Accepted";
      emailMessage = `Your offer of ${negotiation.offerAmount} has been accepted.`;
    } else if (status === "rejected") {
      emailSubject = "Negotiation Rejected";
      emailMessage = `Your offer of ${negotiation.offerAmount} has been rejected.`;
    } else if (status === "countered") {
      emailSubject = "Counter Offer Made";
      emailMessage = `A counter offer of ${counterOffer} has been made.`;
    }

    await sendEmail(negotiation.buyerEmail, emailSubject, emailMessage);
    await sendEmail(negotiation.sellerEmail, emailSubject, emailMessage);

  } catch (err) {
    res.status(500).json({ message: "Error responding to negotiation", error: err });
  }
};

module.exports = { createNegotiation, respondToOffer };
