const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const funcionarioSchema = new mongoose.Schema({
  name: { type: String,
    required: true  },
  datanasc: { 
    type: String,
    required: true },
      email:{
        type: String,
        required: true
        
      },
      senha: {
        type: String,
        required: true
        
      },
      C_senha: { type: String,
        required: true},
  
  slug: { type: String, slug: 'name', unique: true, slug_padding_size: 2 },
});

funcionarioSchema.pre('validate', function (next) {


 next();
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);

