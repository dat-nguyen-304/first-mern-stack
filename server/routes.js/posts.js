import express from "express";
import Post from '../models/Post';
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something is wrong' });
    }
})

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }
    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('https://') ? url : `https://${url}`),
            status: status || 'TO LEARN',
            user: '639053be60932798c58d07d4'
        });
        await newPost.save();
        res.status(200).json({ success: true, message: 'Happy learning', post: newPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something is wrong' });
    }
})

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }
    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        };
        const postUpdateCondition = { _id: req.params.id, user: req.userId };
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });
        if (!updatedPost) {
            return res.status(401).json({ success: false, message: 'Post not found or user not authorized' });
        }
        res.json({ success: true, message: 'Excellent progress!', post: updatedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something is wrong' });
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleteCondition = { _id: req.params.id, user: req.userId };
        const deletedPost = await Post.findOneAndDelete(deleteCondition);
        if (!deletedPost) {
            return res.status(401).json({ success: false, message: 'Post not found or user not authorized' });
        }
        res.json({ success: true, message: 'Excellent progress!', post: deletedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something is wrong' });
    }
})

export default router;
