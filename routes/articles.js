const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

router.route('/')
  .get(getArticles)
  .post(createArticle);

router.route('/:id')
  .get(getArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = router;