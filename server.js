const express = require('express');

//bring in mongoose

//bring in method override
const methodOverride = require('method-override');

const livroRouter = require('./routes/livros');
const Livro = require('./models/Livro');
const leitorRouter = require('./routes/leitores');
const Leitor = require('./models/Leitor');
const emprestimoRouter = require('./routes/emprestimos');
const Emprestimo = require('./models/Emprestimo');
const funcionarioRouter = require('./routes/funcionarios');
const Funcionario = require('./models/Funcionario');
const app = express();

//connect to mongoose
const db = require('./config/database');

db(`mongodb+srv://@cluster0.55ize.gcp.mongodb.net/biblioteca?retryWrites=true&w=majority`)



//mongoose.connect = ('mongodb://localhost/crudblog');


//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index
app.get('/livros', async (request, response) => {
  let livros = await Livro.find().sort({ timeCreated: 'desc' });

  response.render('index', { livros: livros });

});
app.get('/leitores', async (request, response) => {
  let leitores = await Leitor.find().sort({ timeCreated: 'desc' });

  response.render('leitor_index', { leitores: leitores });

});
app.get('/funcionarios', async (request, response) => {
  let funcionarios = await Funcionario.find().sort({ timeCreated: 'desc' });

  response.render('funcionario_index', { funcionarios: funcionarios });

});

app.get('/emprestimos', async (request, response) => {
  let emprestimos = await Emprestimo.find().sort({ timeCreated: 'desc' });

  response.render('emprestimo_index', { emprestimos: emprestimos });

});
app.use(express.static('public'));
app.use('/livros', livroRouter);
app.use('/leitores', leitorRouter);
app.use('/emprestimos', emprestimoRouter);
app.use('/funcionarios', funcionarioRouter);




app.get('/principal',(req, res) => {
  res.render("principal");

});

app.get('/cadastro',(req, res) => {
  res.render("cadastro");

});

app.get('/leitor',(req, res) => {
  res.render("leitor");

});

app.get('/visualizarEmprestimo',(req, res) => {
  res.render("visualizarEmprestimo");

});

app.get('/visualizarLeitor',(req, res) => {
  res.render("visualizarLeitor");

});

app.get('/login',(req, res) => {
  res.render("login");

});


app.post('/', function (req, res) {
  //Do wherever you want here like fetching data and show from the previous form.
  res.render('principal', {
  });
});


//listen port
app.listen(5000);
