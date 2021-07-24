// routes

const express = require('express');
const Funcionario = require('./../models/Funcionario');
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

router.get('/funcionario_new', (request, response) => {
  response.render('funcionario_new');
});



router.get('/funcionario_new', (req, res )  => {
  res.render('funcionario_new')

});

router.get('/:slug', async (request, response) => {
  let funcionario = await Funcionario.findOne({ slug: request.params.slug });

  if (funcionario) {
    response.render('funcionario_show', { funcionario: funcionario });
  } else {
    response.redirect('funcionarios');
  }
});
//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  // ,
  console.log(request.file);
  // console.log(request.body);
  let funcionario = new Funcionario({
    name: request.body.name,
    datanasc: request.body.datanasc,
    email: request.body.email,
    senha: request.body.senha,
    C_senha: request.body.C_senha,
    
    //img: request.file.filename,
  });

  try {
    funcionario = await funcionario.save();

    response.redirect(`funcionarios/${funcionario.slug}`);
  } catch (error) {
    console.log(error);
  }
});

router.get('/principal', (req, res )  => {
  res.render('principal')

});

// route that handles edit view
router.get('/funcionario_edit/:id', async (request, response) => {
  let funcionario = await Funcionario.findById(request.params.id);
  response.render('funcionario_edit', { funcionario: funcionario});
});

//route to handle updates
router.put('/:id', async (request, response) => {
  request.funcionario = await Funcionario.findById(request.params.id);
  let funcionario = request.funcionario;
  funcionario.name = request.body.name;
  funcionario.datanasc = request.body.datanasc;
  funcionario.email = request.body.email;
  //funcionario.senha = request.body.senha;
  //funcionario.C_senha = request.body.C_senha;
  

  try {
    funcionario = await funcionario.save();
    //redirect to the view route
    response.redirect(`/funcionarios/${funcionario.slug}`);
  } catch (error) {
    console.log(error);
    response.redirect(`/sefuncionarios/funcionario_edit/${funcionario.id}`, { funcionario: funcionario });
  }
});



///route to handle delete
router.delete('/:id', async (request, response) => {
  await Funcionario.findByIdAndDelete(request.params.id);
  response.redirect('/funcionarios');
});



module.exports = router;
