const newsModel = require('../models/news.model');

async function showNewsList(req, res) {
  try {
    const news = await newsModel.getAllNewsByLocale('ua');
    res.render('ua/news', { news });
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка при завантаженні новин');
  }
}

async function showNewsListEn(req, res) {
  try {
    const news = await newsModel.getAllNewsByLocale('en');
    res.render('en/news', { news });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading news');
  }
}

async function showSingleNews(req, res) {
  try {
    const { slug } = req.params;
    const article = await newsModel.getNewsBySlugAndLocale(slug, 'ua');
    res.render('ua/news-single', { article });

    if (!article) {
      return res.status(404).send('Новину не знайдено');
    }

    res.render('ua/news-single', { article });
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка при завантаженні новини');
  }
}

async function showSingleNewsEn(req, res) {
  try {
    const { slug } = req.params;
    const article = await newsModel.getNewsBySlugAndLocale(slug, 'en');
    res.render('en/news-single', { article });
    
    if (!article) {
      return res.status(404).send('News not found');
    }

    res.render('en/news-single', { article });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading news');
  }
}

async function showAdminNewsList(req, res) {
  try {
    const news = await newsModel.getAllNews();
    res.render('admin/news-list', { news });
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка при завантаженні адмін-новин');
  }
}

function showCreateNewsForm(req, res) {
  res.render('admin/news-create', {
    error: null,
    formData: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      locale: 'ua'
    }
  });
}

async function createNews(req, res) {
  try {
    const { title, slug, excerpt, content, image, locale } = req.body;

    const imagePath = req.file ? `/uploads/news/${req.file.filename}` : (image || '');

    if (!title || !slug || !content) {
      return res.render('admin/news-create', {
        error: 'Заповни title, slug і content',
        formData: {
          title: title || '',
          slug: slug || '',
          excerpt: excerpt || '',
          content: content || '',
          image: image || '',
          locale: locale || 'ua'
        }
      });
    }

    await newsModel.createNews(
      title,
      slug,
      excerpt,
      content,
      imagePath,
      locale || 'ua'
    );

    res.redirect('/admin/news');
  } catch (error) {
    console.error(error);

    const safeBody = req.body || {};

    res.render('admin/news-create', {
      error: error.message || 'Помилка при створенні новини',
      formData: {
        title: safeBody.title || '',
        slug: safeBody.slug || '',
        excerpt: safeBody.excerpt || '',
        content: safeBody.content || '',
        image: safeBody.image || '',
        locale: safeBody.locale || 'ua'
      }
    });
  }
}

async function showEditNewsForm(req, res) {
  try {
    const { id } = req.params;
    const article = await newsModel.getNewsById(id);

    if (!article) {
      return res.status(404).send('Новину не знайдено');
    }

    res.render('admin/news-edit', {
      error: null,
      article
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка при завантаженні форми редагування');
  }
}

async function updateNews(req, res) {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, image, locale } = req.body;

    const imagePath = req.file ? `/uploads/news/${req.file.filename}` : (image || '');

    if (!title || !slug || !content) {
      return res.render('admin/news-edit', {
        error: 'Заповни title, slug і content',
        article: {
          id,
          title,
          slug,
          excerpt,
          content,
          image: imagePath,
          locale: locale || 'ua'
        }
      });
    }

    const updatedArticle = await newsModel.updateNewsById(id, {
      title,
      slug,
      excerpt,
      content,
      image: imagePath,
      locale: locale || 'ua'
    });

    if (!updatedArticle) {
      return res.status(404).send('Новину не знайдено');
    }

    res.redirect('/admin/news');
  } catch (error) {
    console.error(error);

    const safeBody = req.body || {};

    res.render('admin/news-edit', {
      error: error.message || 'Помилка при оновленні новини',
      article: {
        id: req.params.id,
        title: safeBody.title || '',
        slug: safeBody.slug || '',
        excerpt: safeBody.excerpt || '',
        content: safeBody.content || '',
        image: safeBody.image || '',
        locale: safeBody.locale || 'ua'
      }
    });
  }
}

async function deleteNews(req, res) {
  try {
    const { id } = req.params;

    const deletedArticle = await newsModel.deleteNewsById(id);

    if (!deletedArticle) {
      return res.status(404).send('Новину не знайдено');
    }

    res.redirect('/admin/news');
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка при видаленні новини');
  }
}

module.exports = {
  showNewsList,
  showNewsListEn,
  showSingleNews,
  showSingleNewsEn,
  showAdminNewsList,
  showCreateNewsForm,
  createNews,
  showEditNewsForm,
  updateNews,
  deleteNews
};