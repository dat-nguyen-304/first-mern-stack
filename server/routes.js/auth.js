import express from "express";
import User from '../models/User';
import argon2 from "argon2";
import jwt from 'jsonwebtoken';
require('dotenv').config();


const router = express.Router();
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing parameter' });
    }
    try {
        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ success: false, message: 'Username already exist' });
        const hashPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashPassword
        })
        await newUser.save();
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ success: true, message: 'Create successfully', accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something is wrong' });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing parameter' });
    try {
        const user = await User.findOne({ username });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' });

        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' });
        else {
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
            return res
                .status(200)
                .json({ success: true, message: 'Logged in successfully', accessToken });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something is wrong' });
    }
})

export default router;
