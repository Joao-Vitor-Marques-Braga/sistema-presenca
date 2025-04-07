# sistema-presenca

## Arquitetura utilizada

Será utilizado a arquitetura MVC (Model-View-Controller) para este sistema por proporcionar uma separação clara entre dados, interface e lógica. Isso facilita a manutenção, melhora a organização do código e permite futuras expansões sem comprometer a estrutura existente. Além disso, essa abordagem modular torna o desenvolvimento mais eficiente e a depuração de erros mais simples.
	O sistema terá a seguinte organização com base no MVC:
	sistema-frequência
	-Model -> Gerenciamento de Dados
	|-Aluno.js -> Estrutura do aluno
	|-Presenca.js -> Registra presença do aluno
	|-Turma.js -> Estrutura da turma
	|-database.js -> Gerência armazenamento
	-View -> Interface do usuário
	|-index.html -> pagina
	|-style.css -> estilos
	|-main.js -> Manipulação e requisição ao controller
	-Controller -> Regras de negócio
	|-AlunoController.js ->Cadastra alunos e vincula a turmas
	|-PresencaController.js -> Marca presença e gera relatórios
	|-TurmaController.js -> Adiciona e gerencia turmas.

## Tecnologias Utilizadas
  • Linguagem: JavaScript
  • Armazenamento: JSON
  • Interface: HTML + CSS
  • Justificativa: JavaScript mantém o sistema leve e sem dependências externas, além de possuir uma maior familiaridade com a linguagem, além da facilidade de criação de uma interface web com html e css. JSON é uma forma simples de armazenar dados sem necessidade de banco de dados complexo.
  • Requisitos de Hardware: Basta apenas um navegador e conexão com internet.
