const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account');

const router = new express.Router();

const User = require('../models/user');
const auth = require('../middleware/auth');

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e) {
        res.status(400).send(e);
    }
    
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch(e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();

    } catch (e) {
        res.status(500).send();
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(e) {
        res.status(500).send();
        console.log(e);
    }
});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type','image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
    // Mongoose ignores properties, that the object does not have.
    // If we want to have an error response that tell us the property is not changeable, we need something like this code
    updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'});
    }

    try {
        //const user = await User.findById(req.params.id);
        user = await req.user;
        updates.forEach((update) => {
            //console.log(update);
            req.user[update] = req.body[update];
        });
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        sendCancelationEmail(req.user.email, req.user.name);
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    };
});

const upload = multer({
    //dest: 'avatars',  // do use: for defining upload folder, do not use: passing it to the callback func
    limits: {
        fileSize: 1000000   // 1 MByte
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please only upload images (jpg, jpeg, png)'));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height:250 }).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

module.exports = router;