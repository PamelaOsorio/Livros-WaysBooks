// routes

const express = require('express');
const Emprestimo = require('./../models/Emprestimo');
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

router.get('/emprestimo_new', (request, response) => {
  response.render('emprestimo_new');
});

//view route
router.get('/:slug', async (request, response) => {
  let emprestimo = await Emprestimo.findOne({ slug: request.params.slug });

  if (emprestimo) {
    response.render('emprestimo_show', { emprestimo: emprestimo });
  } else {
    response.redirect('emprestimos');
  }
});


router.get('/emprestimo_new', (req, res )  => {
  res.render('emprestimo_new')

});



//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  // ,
  console.log(request.file);
  // console.log(request.body);
  let emprestimo = new Emprestimo({
    Data_emprestimo: request.body.Data_emprestimo,
    Data_devolucao: request.body.Data_devolucao,
    name: request.body.name,
    surname: request.body.surname,
    title: request.body.title,
    author: request.body.author,
    tel: request.body.tel,
    email: request.body.email,
    //img: request.file.filename,
  });

  try {
    emprestimo = await emprestimo.save();

    response.redirect(`emprestimos/${emprestimo.slug}`);
  } catch (error) {
    console.log(error);
  }
});

router.get('/principal', (req, res )  => {
  res.render('principal')

});

// route that handles edit view
router.get('/emprestimo_edit/:id', async (request, response) => {
  let emprestimo = await Emprestimo.findById(request.params.id);
  response.render('emprestimo_edit', { emprestimo: emprestimo});
});

//route to handle updates
router.put('/:id', async (request, response) => {
  request.emprestimo = await Emprestimo.findById(request.params.id);
  let emprestimo = request.emprestimo;
  emprestimo.Data_emprestimo = request.body.Data_emprestimo;
  emprestimo.Data_devolucao = request.body.Data_devolucao;
  emprestimo.name = request.body.name;
  emprestimo.surname= request.body.surname;
  emprestimo.title = request.body.title;
  emprestimo.author = request.body.author;
  emprestimo.tel = request.body.tel;
  emprestimo.email = request.body.email;

  try {
    emprestimo = await emprestimo.save();
    //redirect to the view route
    response.redirect(`/emprestimos/${emprestimo.slug}`);
  } catch (error) {
    console.log(error);
    response.redirect(`/seemprestimos/emprestimo_edit/${emprestimo.id}`, { emprestimo: emprestimo });
  }
});

///route to handle delete
router.delete('/:id', async (request, response) => {
  await Emprestimo.findByIdAndDelete(request.params.id);
  response.redirect('/emprestimos');
});

db.emprestimo.aggregate([
  {
      $lookup:
      {
          from: "emprestimo",
          localField: "id_emprestimo",
          foreignField: "_id",
          as: "desc_emprestimo"
      }
    },

    {
    $lookup:
    {
        from: "leitor",
        localField: "id_leitor",
        foreignField: "_id",
        as: "desc_leitor"
    }
}])
module.exports = router;
