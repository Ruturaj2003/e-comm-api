const agg = [
  {
    $match: {
      product: new ObjectId("673cb02092a6007b06c39751"),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: "$rating",
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];
