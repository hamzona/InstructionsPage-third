const Post = require("../models/postModel");

const filterPosts = async (req, res, next) => {
  /*sortiranje */
  const { sortBy } = req.query;
  let sortOpition = {};
  if (sortBy === "rate") {
    sortOpition = { rate: -1 };
  } else if (sortBy === "date") {
    sortOpition = { date: -1 };
  }
  /*FILTERS */

  //price
  const search = req.query.search || "";
  let max = parseFloat(req.query.max);
  let min = parseFloat(req.query.min);
  let setPrice = false;
  console.log(!(!max && !min));
  if (!(!max && !min)) {
    setPrice = true;
  }
  if (!max) {
    max = 10000;
  }
  if (!min) {
    min = 0;
  }
  let priceFilter = setPrice
    ? {
        $and: [
          { price: { $exists: true, $ne: null } },
          { $or: [{ price: null }, { price: { $gt: min, $lt: max } }] },
        ],
      }
    : {};
  console.log(priceFilter);
  let filters = {};
  Object.keys(req.query).forEach((item) => {
    if (item === "subject" || item === "jobType") {
      filters[item] = req.query[item];
    }
  });
  console.log(max);

  req.data = await Post.find({
    $and: [
      {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { userName: { $regex: search, $options: "i" } },
          { subject: { $regex: search, $options: "i" } },
        ],
      },
      filters,
      priceFilter,
    ],
  }).sort(sortOpition);
  next();
};

module.exports = { filterPosts };
