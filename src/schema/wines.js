var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WineSchema = new Schema({}, { collection: "wines" });

module.exports = mongoose.model("wines", WineSchema);