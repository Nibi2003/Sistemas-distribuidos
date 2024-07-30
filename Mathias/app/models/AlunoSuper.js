const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlunoSuperSchema = new Schema({
    nome: {
        type: String,
        required: true
    }
});

module.exports = AlunoSuper = mongoose.model('alunos_super', AlunoSuperSchema);
