// routes

const express = require('express');
const Livro = require('./../models/Livro');
const router = express.Router();
const multer = require('multer');



//define storage for the images

const storage = multer.diskStorage({
 //destination for files
 //destination: function (request, file, callback) {
  //callback(null, './public/uploads/images');
 //},

  //add back the extension
 filename: function (request, file, callback) {
 callback(null, Date.now() + file.originalname);
 },
});

//upload parameters for multer
const upload = multer({
 storage: storage,
 limits: {
 fieldSize: 1024 * 1024 * 3,
 },
});

router.get('/new', (request, response) => {
  response.render('new');
});

//view route
router.get('/:slug', async (request, response) => {
  let livro = await Livro.findOne({ slug: request.params.slug });

  if (livro) {
    response.render('show', { livro: livro });
  } else {
    response.redirect('/');
  }
});

router.get('/principal', (req, res )  => {
  res.render('principal')

});

//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  // ,
  console.log(request.file);
  // console.log(request.body);
  let livro = new Livro({
    title: request.body.title,
    author: request.body.author,
    year: request.body.year,
    editora: request.body.editora,
    kindof: request.body.kindof,
    //img: request.file.filename,
  });

  try {
    livro = await livro.save();

    response.redirect(`livros/${livro.slug}`);
  } catch (error) {
    console.log(error);
  }
});

// route that handles edit view
router.get('/edit/:id', async (request, response) => {
  let livro = await Livro.findById(request.params.id);
  response.render('edit', { livro: livro});
});

//route to handle updates
router.put('/:id', async (request, response) => {
  request.livro = await Livro.findById(request.params.id);
  let livro = request.livro;
  livro.title = request.body.title;
  livro.author = request.body.author;
  livro.year = request.body.year;
  livro.editora = request.body.editora;
  livro.kindof = request.body.kindof;

  try {
    livro = await livro.save();
    //redirect to the view route
    response.redirect(`/livros/${livro.slug}`);
  } catch (error) {
    console.log(error);
    response.redirect(`/selivros/edit/${livro.id}`, { livro: livro });
  }
});

///route to handle delete
router.delete('/:id', async (request, response) => {
  await Livro.findByIdAndDelete(request.params.id);
  response.redirect('/livros');
});

module.exports = router;
