// routes

const express = require('express');
const Leitor = require('./../models/Leitor');
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

router.get('/leitor_new', (request, response) => {
  response.render('leitor_new');
});

//view route
router.get('/:slug', async (request, response) => {
  let leitor = await Leitor.findOne({ slug: request.params.slug });

  if (leitor) {
    response.render('leitor_show', { leitor: leitor });
  } else {
    response.redirect('leitores');
  }
});

router.get('/leitor_new', (req, res )  => {
  res.render('leitor_new')

});

//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  // ,
  console.log(request.file);
  // console.log(request.body);
  let leitor = new Leitor({
    name: request.body.name,
    surname: request.body.surname,
    datanasc: request.body.datanasc,
    bairro: request.body.bairro,
    rua: request.body.rua,
    numero: request.body.numero,
    tel: request.body.tel,
    email: request.body.email,
    //img: request.file.filename,
  });

  try {
    leitor = await leitor.save();

    response.redirect(`leitores/${leitor.slug}`);
  } catch (error) {
    console.log(error);
  }
});

router.get('/principal', (req, res )  => {
  res.render('principal')

});

// route that handles edit view
router.get('/leitor_edit/:id', async (request, response) => {
  let leitor = await Leitor.findById(request.params.id);
  response.render('leitor_edit', { leitor: leitor});
});

//route to handle updates
router.put('/:id', async (request, response) => {
  request.leitor = await Leitor.findById(request.params.id);
  let leitor = request.leitor;
  leitor.name = request.body.name,
  leitor.surname = request.body.surname,
  leitor.datanasc = request.body.datanasc,
  leitor.bairro = request.body.bairro,
  leitor.rua = request.body.rua,
  leitor.numero = request.body.numero,
  leitor.tel = request.body.tel,
  leitor.email = request.body.email
  try {
    leitor = await leitor.save();
    //redirect to the view route
    response.redirect(`/leitores/${leitor.slug}`);
  } catch (error) {
    console.log(error);
    response.redirect(`/seleitores/leitor_edit/${leitor.id}`, { leitor: leitor });
  }
});

///route to handle delete
router.delete('/:id', async (request, response) => {
  await Leitor.findByIdAndDelete(request.params.id);
  response.redirect('/leitores');
});

module.exports = router;
