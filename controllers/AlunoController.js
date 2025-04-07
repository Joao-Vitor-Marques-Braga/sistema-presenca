const Aluno = require('../models/Aluno');
const { loadJSON, saveJSON } = require('../models/database');

const ALUNO_FILE = 'alunos.json';

function adicionarAluno(nome, turmaId) {
  const alunos = loadJSON(ALUNO_FILE);
  const novoAluno = new Aluno(Date.now(), nome, turmaId);
  alunos.push(novoAluno);
  saveJSON(ALUNO_FILE, alunos);
  return novoAluno;
}

function listarAlunosPorTurma(turmaId) {
  const alunos = loadJSON(ALUNO_FILE);
  return alunos.filter(aluno => aluno.turmaId === Number(turmaId));
}

function buscarAlunoPorId(id) {
  const alunos = loadJSON(ALUNO_FILE);
  return alunos.find(aluno => aluno.id === id);
}

module.exports = {
  adicionarAluno,
  listarAlunosPorTurma,
  buscarAlunoPorId
};
