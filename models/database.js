const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data');

function loadJSON(file) {
  const filePath = path.join(dataPath, file);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content ? JSON.parse(content) : [];
  } catch (error) {
    console.error(`Erro ao ler/parsing o arquivo ${file}:`, error);
    return [];
  }
}


function saveJSON(file, data) {
  const filePath = path.join(dataPath, file);
  console.log("Salvando em:", filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { loadJSON, saveJSON };
