const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const livroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  editora: {
    type: String,
    required: true
  },
  kindof: {
    type: String,
    required: true
  },
  
  slug: { type: String, slug: 'title', unique: true, slug_padding_size: 2 },
});

livroSchema.pre('validate', function (next) {
 

 next();
});

module.exports = mongoose.model('livro', livroSchema);
