const postModel = require("../models/postModel");

// create post
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    // validate
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields details",
      });
    }

    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });

    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Create Post API",
    });
  }
};

// GET ALL POSTS CONTROLLER
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Post",
      error,
    });
  }
};

// user post controller
getUserPostController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error occur in User Post",
      error,
    });
  }
};

// delete post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post Deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error ocuur in delete post api",
      error,
    });
  }
};

// Update post controller
const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    // post find
    const post = await postModel.findById({ _id: req.params.id });

    // validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide post title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occur while updating",
      error,
    });
  }
};
module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostController,
  deletePostController,
  updatePostController,
};
