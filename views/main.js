async function handleAddTurma() {
    const nome = document.getElementById('nomeTurma').value;
    await fetch('http://localhost:3000/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });
    alert('Turma adicionada!');
    location.reload();
}

async function handleAddAluno() {
    const nome = document.getElementById('nomeAluno').value;
    const turmaId = document.getElementById('turmaSelectAluno').value;

    await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, turmaId: Number(turmaId) })
    });

    alert('Aluno adicionado!');
    location.reload();
}


async function carregarTurmas() {
    const response = await fetch('http://localhost:3000/turmas');
    const turmas = await response.json();

    const selectAluno = document.getElementById('turmaSelectAluno');
    const selectPresenca = document.getElementById('turmaSelectPresenca');

    turmas.forEach(turma => {
        const option1 = document.createElement('option');
        option1.value = turma.id;
        option1.textContent = turma.nome;
        selectAluno.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = turma.id;
        option2.textContent = turma.nome;
        selectPresenca.appendChild(option2);
    });
}

async function carregarAlunosDaTurma(turmaId) {
    const response = await fetch(`http://localhost:3000/alunos?turmaId=${turmaId}`);
    const alunos = await response.json();

    const alunoSelect = document.getElementById('alunoSelect');
    alunoSelect.innerHTML = '';

    alunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.id;
        option.textContent = aluno.nome;
        alunoSelect.appendChild(option);
    });
}


async function carregarTurmasNoSelect() {
    const response = await fetch('http://localhost:3000/turmas');
    const turmas = await response.json();

    const select = document.getElementById('turmaAlunoSelect');
    select.innerHTML = '';

    turmas.forEach(turma => {
        const option = document.createElement('option');
        option.value = turma.id;
        option.textContent = turma.nome;
        select.appendChild(option);
    });
}

async function carregarTurmasPresenca() {
    const turmaSelect = document.getElementById('turmaSelectPresenca');
    turmaSelect.innerHTML = '<option value="">Selecione uma turma</option>';

    const res = await fetch('http://localhost:3000/turmas');
    const turmas = await res.json();

    turmas.forEach(turma => {
        const option = document.createElement('option');
        option.value = turma.id;
        option.textContent = turma.nome;
        turmaSelect.appendChild(option);
    });
}

async function carregarAlunosDaTurma(turmaId) {
    const response = await fetch(`http://localhost:3000/alunos?turmaId=${turmaId}`);
    const alunos = await response.json();

    const alunoSelect = document.getElementById('alunoSelect');
    alunoSelect.innerHTML = '';

    alunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.id;
        option.textContent = aluno.nome;
        alunoSelect.appendChild(option);
    });
}


async function handleMarcarPresenca() {
    const data = document.getElementById('dataPresenca').value;
    const alunoId = document.getElementById('alunoSelect').value;

    if (!data || !alunoId) {
        alert('Selecione uma data e um aluno.');
        return;
    }

    const res = await fetch('http://localhost:3000/presencas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alunoId: Number(alunoId), data })
    });

    if (res.ok) {
        alert('Presença marcada com sucesso!');
    } else {
        alert('Erro ao marcar presença.');
    }
}

async function carregarAlunosDaTurmaPresenca() {
    const turmaId = document.getElementById('turmaSelectPresenca').value;
    const alunoSelect = document.getElementById('alunoSelect');
    alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';

    if (!turmaId) return;

    const res = await fetch(`http://localhost:3000/alunos/turma/${turmaId}`);
    const alunos = await res.json();

    alunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.id;
        option.textContent = aluno.nome;
        alunoSelect.appendChild(option);
    });
}


async function carregarTurmasRelatorio() {
    const turmaSelect = document.getElementById('turmaSelectRelatorio');
    turmaSelect.innerHTML = '<option value="">Selecione uma turma</option>';

    const res = await fetch('http://localhost:3000/turmas');
    const turmas = await res.json();

    turmas.forEach(turma => {
        const option = document.createElement('option');
        option.value = turma.id;
        option.textContent = turma.nome;
        turmaSelect.appendChild(option);
    });
}

async function carregarAlunosRelatorio() {
    const turmaId = document.getElementById('turmaSelectRelatorio').value;
    const alunoSelect = document.getElementById('alunoSelectRelatorio');
    alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';

    if (!turmaId) return;

    const res = await fetch(`http://localhost:3000/alunos/turma/${turmaId}`);
    const alunos = await res.json();

    alunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.id;
        option.textContent = aluno.nome;
        alunoSelect.appendChild(option);
    });
}


async function handleVerRelatorio() {
    const alunoId = document.getElementById('alunoSelectRelatorio').value;

    if (!alunoId) {
        alert('Selecione um aluno');
        return;
    }

    const res = await fetch(`http://localhost:3000/presencas/${alunoId}`);
    const presencas = await res.json();

    const lista = document.getElementById('relatorioLista');
    lista.innerHTML = '';
    presencas.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `Presente em: ${formatarData(p.data)}`;
        lista.appendChild(li);
    });
}

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

window.addEventListener('DOMContentLoaded', () => {
    carregarTurmasRelatorio();

    document.getElementById('turmaSelectRelatorio').addEventListener('change', () => {
        carregarAlunosRelatorio();
    });
});


window.onload = () => {
    carregarTurmas();

    const turmaSelectPresenca = document.getElementById('turmaSelectPresenca');
    turmaSelectPresenca.addEventListener('change', (e) => {
        const turmaId = e.target.value;
        carregarAlunosDaTurma(turmaId);
    });
};
