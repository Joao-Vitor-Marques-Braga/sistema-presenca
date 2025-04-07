const Presenca = require('../models/Presenca');
const { loadJSON, saveJSON } = require('../models/database');
const { buscarAlunoPorId, listarAlunosPorTurma } = require('./AlunoController');

const PRESENCA_FILE = 'presencas.json';

function marcarPresenca(alunoId, data) {
  const presencas = loadJSON(PRESENCA_FILE);
  const novaPresenca = new Presenca(Date.now(), alunoId, data);
  console.log("Nova presença:", novaPresenca);
  presencas.push(novaPresenca);
  saveJSON(PRESENCA_FILE, presencas);
  return novaPresenca;
}


function listarPresencasPorTurma(turmaId, data) {
  const presencas = loadJSON(PRESENCA_FILE);
  const alunosDaTurma = listarAlunosPorTurma(turmaId);

  return alunosDaTurma.map(aluno => ({
    ...aluno,
    presente: presencas.some(p => p.alunoId === aluno.id && p.data === data)
  }));
}

function getPresencasPorAluno(alunoId) {
  const presencas = loadJSON(PRESENCA_FILE);
  return presencas.filter(p => p.alunoId === alunoId);
}

function gerarRelatorioAluno(alunoId) {
  const presencas = loadJSON(PRESENCA_FILE);
  return presencas
    .filter(p => p.alunoId === alunoId)
    .map(p => p.data);
}

module.exports = {
  marcarPresenca,
  listarPresencasPorTurma,
  gerarRelatorioAluno,
  getPresencasPorAluno
};
