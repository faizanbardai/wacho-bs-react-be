var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var multiLingualContent = new Schema(
  {
    lang: String,
    content: Object
  },
  { collection: "multiLingualContent" }
);

const multiLingualContentModel = mongoose.model("multiLingualContent", multiLingualContent);

module.exports = multiLingualContentModel;
