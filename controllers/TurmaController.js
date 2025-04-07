const Turma = require('../models/Turma');
const { loadJSON, saveJSON } = require('../models/database');

const TURMA_FILE = 'turmas.json';

function adicionarTurma(nome) {
  const turmas = loadJSON(TURMA_FILE);
  const novaTurma = new Turma(Date.now(), nome);
  turmas.push(novaTurma);
  saveJSON(TURMA_FILE, turmas);
  return novaTurma;
}

function listarTurmas() {
  return loadJSON(TURMA_FILE);
}

module.exports = {
  adicionarTurma,
  listarTurmas
};
