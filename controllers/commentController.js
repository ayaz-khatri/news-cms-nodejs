import Comment from "../models/Comment.js";

const allComments = async (req, res) => {
    res.render('admin/comments', {role: req.role})
};

export default {
    allComments
}