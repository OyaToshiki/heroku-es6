import express from 'express';

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Heroku' });
});

export default router;
