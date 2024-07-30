const express = require('express');
const AlunoCiencia = require('../models/AlunoCiencia');
const AlunoSuper = require('../models/AlunoSuper');

const router = express.Router();

// Rota para a página inicial
router.get('/', async (req, res) => {
    try {
        const alunos_ciencia = await AlunoCiencia.find();
        const alunos_super = await AlunoSuper.find();
        res.render("loja", {
            nomes: alunos_ciencia.length > 0 ? alunos_ciencia : [],
            nomesSuper: alunos_super.length > 0 ? alunos_super : [],

            resultado: {} // Adiciona a variável 'resultado' como um objeto vazio
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter dados.");
    }
});

// POST - Submit Task
router.post('/', (req, res) => {
    const newAluno = new AlunoCiencia({
        nome: req.body.nome_html
    });

    newAluno.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
});

// POST - Destroy item
router.post('/AlunoCiencia/destroy', async (req, res) => {
    try {
        const taskKey = req.body._key;
        await AlunoCiencia.findOneAndRemove({_id: taskKey});
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao deletar aluno.");
    }
});

// POST - Submit Super
router.post('/super', (req, res) => {
    const newAlunoSuper = new AlunoSuper({
        nome: req.body.nome_super
    });

    newAlunoSuper.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
});

// POST - Destroy item Super
router.post('/super/destroy', async (req, res) => {
    try {
        const taskKey = req.body._key;
        await AlunoSuper.findOneAndRemove({_id: taskKey});
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao deletar aluno Super.");
    }
});

// POST - Search
router.post('/search', async (req, res) => {
    const nomePesquisa = req.body.nome_pesquisa.trim();
    const resultado = {
        presenteEmAmbos: false,
        presenteSomenteCiencia: false,
        presenteSomenteSuper: false
    };

    try {
        const alunoCiencia = await AlunoCiencia.findOne({ nome: nomePesquisa });
        const alunoSuper = await AlunoSuper.findOne({ nome: nomePesquisa });

        if (alunoCiencia && alunoSuper) {
            resultado.presenteEmAmbos = true;
        } else if (alunoCiencia) {
            resultado.presenteSomenteCiencia = true;
        } else if (alunoSuper) {
            resultado.presenteSomenteSuper = true;
        }

        res.render("alunos_ciencia_super", {
            nomes: await AlunoCiencia.find(),
            nomesSuper: await AlunoSuper.find(),
            resultado: resultado
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao pesquisar nome.");
    }
});

module.exports = router;
