import Comment from "../models/Comment.js";

const allComments = async (req, res) => {
    res.render('admin/comments')
};

export default {
    allComments
}