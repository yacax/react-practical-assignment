const express = require('express');

const postCtrl = require('../controllers/postCtrl');
const { getPostDB, editPostDB } = require('../models/post');
const { upload } = require('../utils/fileUploader');
const router = express.Router();

router.get('/:id', postCtrl.getPost);

router.get('/search/:filter', postCtrl.searchPosts);
router.post('', postCtrl.addPost);
router.get('', postCtrl.getPosts);
router.get('/page/:pageNumber', postCtrl.getPostsPage);
router.put('/:id', postCtrl.editPost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id/picture', upload.single('picture'), async (req, res) => {
    const file = req.file;
    const postID = +req.params.id;
    try {
        if (file) {
            const filePath = `http://localhost:8080/${file.filename}`;
            let post = await getPostDB(postID);
            if (!post) throw new Error(`Post ${postID} doesn't exists`);
            post.imageSrc = filePath;
            await editPostDB(post.id, post);
            post = await getPostDB(postID);
            res.status(200).send({success: true, result: post});
        } else {
            res.status(400).send({success: false});
        }
    } catch (e) {
        res.status(400).send({success: false, result: e.message});
    }
});

module.exports = router;
