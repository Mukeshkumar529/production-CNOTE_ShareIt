const mongoose = require("mongoose");

// post schema
const postShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add post title"],
    },
    description: {
      type: String,
      required: [true, "Please add post description"],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postShema);