const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const TurmaController = require('../controllers/TurmaController');
const AlunoController = require('../controllers/AlunoController');
const PresencaController = require('../controllers/PresencaController');
const { marcarPresenca } = require('../controllers/PresencaController');
const { getPresencasPorAluno } = require('../controllers/PresencaController');

app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, '../data');

function readJSON(file) {
    return JSON.parse(fs.readFileSync(path.join(dataPath, file)));
}

function writeJSON(file, data) {
    fs.writeFileSync(path.join(dataPath, file), JSON.stringify(data, null, 2));
}

app.get('/turmas', (req, res) => {
    const turmas = TurmaController.listarTurmas();
    res.json(turmas);
});

app.post('/turmas', (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ message: 'O nome da turma é obrigatório.' });
    }
    try {
        const novaTurma = TurmaController.adicionarTurma(nome);
        res.status(201).json({ message: 'Turma adicionada', turma: novaTurma });
    } catch (error) {
        console.error('Erro ao adicionar turma:', error);
        res.status(500).json({ message: 'Erro interno ao adicionar turma.' });
    }
});


app.get('/alunos', (req, res) => {
    const turmaId = Number(req.query.turmaId);

    if (turmaId) {
        const alunos = AlunoController.listarAlunosPorTurma(turmaId);
        return res.json(alunos);
    }

    const alunos = loadJSON('alunos.json');
    res.json(alunos);
});


app.post('/alunos', (req, res) => {
    const { nome, turmaId } = req.body;

    if (!nome || !turmaId) {
        return res.status(400).json({ message: "Nome e turmaId são obrigatórios." });
    }

    try {
        const novoAluno = AlunoController.adicionarAluno(nome, turmaId);
        res.status(201).json({ message: "Aluno adicionado", aluno: novoAluno });
    } catch (error) {
        console.error('Erro ao adicionar aluno:', error);
        res.status(500).json({ message: 'Erro interno ao adicionar aluno.' });
    }
});

app.get('/alunos/turma/:turmaId', (req, res) => {
    const turmaId = Number(req.params.turmaId);
    const alunos = AlunoController.listarAlunosPorTurma(turmaId);
    res.json(alunos);
});


app.get('/presencas', (req, res) => {
    res.json(readJSON('presencas.json'));
});

app.post('/presencas', async (req, res) => {
    try {
        const { alunoId, data } = req.body;
        const presenca = await marcarPresenca(alunoId, data);
        res.json(presenca);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao marcar presença' });
    }
});

app.get('/presencas/:alunoId', (req, res) => {
    try {
        const alunoId = Number(req.params.alunoId);
        const presencas = getPresencasPorAluno(alunoId);
        res.json(presencas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao buscar presenças' });
    }
});

app.get('/presencas/turma/:turmaId/:data', (req, res) => {
    const { turmaId, data } = req.params;
    try {
        const lista = PresencaController.listarPresencasPorTurma(Number(turmaId), data);
        res.json(lista);
    } catch (error) {
        console.error('Erro ao buscar presenças:', error);
        res.status(500).json({ message: 'Erro ao listar presenças.' });
    }
});

app.get('/presencas/aluno/:alunoId', (req, res) => {
    const alunoId = Number(req.params.alunoId);
    try {
        const relatorio = PresencaController.gerarRelatorioAluno(alunoId);
        res.json(relatorio);
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        res.status(500).json({ message: 'Erro ao gerar relatório do aluno.' });
    }
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));