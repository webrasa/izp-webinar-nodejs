const Article = require('../models/Article');

// GET /api/articles - sa paginacijom i filterima
exports.getArticles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filteri
    const filter = {};
    if (req.query.published) filter.published = req.query.published === 'true';
    if (req.query.author) filter.author = req.query.author;
    if (req.query.tag) filter.tags = req.query.tag;
    if (req.query.search) filter.$text = { $search: req.query.search };

    const articles = await Article.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Article.countDocuments(filter);

    res.json({
      success: true,
      count: articles.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: articles
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/articles/:id
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Članak nije pronađen'
      });
    }

    article.views += 1;
    await article.save();

    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// POST /api/articles
exports.createArticle = async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// PUT /api/articles/:id
exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Članak nije pronađen'
      });
    }

    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/articles/:id
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Članak nije pronađen'
      });
    }

    res.json({ success: true, message: 'Članak obrisan' });
  } catch (error) {
    next(error);
  }
};