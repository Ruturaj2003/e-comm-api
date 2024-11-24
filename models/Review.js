const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please Provide a Rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please Provide a Title"],
    },
    comment: {
      type: String,
      required: [true, "Please Provide review text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calcAvgRating = async function (productId) {
  console.log(productId);
};

ReviewSchema.post("save", async function () {
  await this.constructor.calcAvgRating(this.product);

  console.log("Post Save Hook Called");
});

ReviewSchema.post("remove", async function () {
  await this.constructor.calcAvgRating(this.product);

  console.log("Post Remove Hook Called");
});
module.exports = mongoose.model("Review", ReviewSchema);
