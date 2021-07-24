const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
//const Emprestimo = require('./Emprestimo');

mongoose.plugin(slug);
const emprestimoSchema = new mongoose.Schema({
    
      Data_emprestimo:{
        type: String,
        required: true
        
      },
      Data_devolucao: {
        type: String,
        required: true
      },
    name : { type: String,
      required: true },
    surname: { type: String,
      required: true  },
    title: { type: String,
      required: true },
    author: { type: String,
      required: true  },
    tel: { type: String,
      required: true  },
    email: { type: String,
      required: true  },
  slug: { type: String, slug: 'name', unique: true, slug_padding_size: 2 },
});

emprestimoSchema.pre('validate', function (next) {
  

 next();
});

module.exports = mongoose.model('Emprestimo', emprestimoSchema);

