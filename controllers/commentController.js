import Comment from "../models/Comment.js";
import News from "../models/News.js";

const allComments = async (req, res) => {
    try {
        let comments;
        if(req.role === 'admin'){
            comments = await Comment.find().populate('article').sort({ createdAt: -1 });
        } else {
            const news = await News.find({author: req.id});
            const newsIds = news.map(n => n._id);
            comments = await Comment.find({ article: { $in: newsIds } }).populate('article').sort({ createdAt: -1 });
        }
        res.render('admin/comments', {comments, role: req.role});
    } catch (error) {
        console.log(error);
    } 
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const comment = await Comment.findById(id);
        comment.status = status;
        await comment.save();
        // res.redirect('/admin/comments');
        res.json({ success: true, message: 'Comment status updated successfully.' });
    } catch (error) {
        console.log(error);
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);
        // res.redirect('/admin/comments');
        res.json({ success: true, message: 'Comment deleted successfully.' });
    } catch (error) {
        console.log(error);
    }
};

export default {
    allComments,
    updateComment,
    deleteComment
}