const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoCienciaSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});

module.exports = AlunoCiencia = mongoose.model('alunos_ciencia', AlunoCienciaSchema);
