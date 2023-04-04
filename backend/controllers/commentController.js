const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const postComment = async (req, res) => {
  const { content, postId, userName } = req.body;
  let rate = parseInt(req.body.rate);
  try {
    const exsistRate = await Comment.find({
      postId,
      userName,
      rate: { $exists: true, $gt: 0 },
    });
    if (exsistRate.length !== 0 && rate !== 0) {
      throw Error("You already rated user");
    }
    /*RATE */
    rate = rate === 0 ? null : rate;
    const newComment = await Comment.create({
      content,
      postId,
      userName,
      rate,
    });

    const rates = await Comment.find({
      postId,
      rate: { $exists: true, $gt: 0 },
    }).select({
      rate: 1,
      _id: 0,
    });
    console.log(rates);
    let sum = 0;
    rates.forEach((rate) => {
      sum = sum + rate.rate;
    });
    console.log(sum);
    console.log(rates.length);
    const l = rates.length === 0 ? 1 : rates.length;
    sum = sum / l;

    var postRate = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      { $set: { rate: sum } },
      { returnOriginal: false }
    );
    console.log(postRate);

    res.json({ newComment, postRate });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const getComments = async (req, res) => {
  const { postId } = req.body;
  console.log(postId);
  try {
    const allComments = await Comment.find({ postId }).sort({ _id: -1 });
    res.json(allComments);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const deleteComment = async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteComment = await Comment.findById(_id);
    if (deleteComment === null) {
      throw Error("Comment doesnt exsist");
    }
    await deleteComment.remove();
    res.json(deleteComment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = { postComment, getComments, deleteComment };
