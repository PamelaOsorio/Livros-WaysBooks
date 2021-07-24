const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const leitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  datanasc: {
    type: String,
    required: true,
   
  },
  bairro: {
    type: String,
    required: true
  },
  rua: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  slug: { type: String, slug: 'name', unique: true, slug_padding_size: 2 },
});

leitorSchema.pre('validate', function (next) {
  

 next();
});

module.exports = mongoose.model('leitor', leitorSchema);

