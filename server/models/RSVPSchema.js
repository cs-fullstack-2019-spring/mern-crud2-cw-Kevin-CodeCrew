const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Simple data model for an RSVP record
const RSVPSchema = new Schema(
    {
        rsvp_person: String,
        rsvp_going: Boolean
    }
);

module.exports = mongoose.model('rsvp',RSVPSchema);