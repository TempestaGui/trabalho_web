# 📅 Agenda Mindful

Bem-vindo(a) ao repositório da Agenda Mindful! ✨  
Um sistema completo para organização pessoal com foco em bem-estar e produtividade.

**Desenvolvido por:**  
Guilherme Tempesta Francisco (2312130221)  
Disciplina: Tecnologias Web

---

## 🧰 Tecnologias Utilizadas

🖥️ **Frontend**  
• HTML5 semântico  
• CSS3 moderno (Flexbox, Grid, Variáveis CSS)  
• React 

🗃️ **Armazenamento**  
• banco de dados 

🎨 **Design**  
• UI/UX minimalista e intuitiva  
• Totalmente responsivo (mobile-first)  

---

## 📂 Estrutura do Projeto
  site/
 ├── public/               → Arquivos estáticos (favicon, manifest, etc.)
 ├── src/
 │   ├── main.jsx          → Ponto de entrada da aplicação React
 │   ├── App.jsx           → Componente raiz com rotas
 │   ├── style.css         → Estilos globais
 │   ├── context/
 │   │   └── AuthContext.jsx → Autenticação (login/logout)
 │   ├── pages/
 │   │   ├── LoginPage.jsx → Página de login
 │   │   └── HomePage.jsx  → Página principal da agenda
 │   ├── components/
 │   │   ├── TaskForm.jsx  → Formulário de tarefas
 │   │   ├── TaskList.jsx  → Lista de tarefas
 │   │   ├── TaskItem.jsx  → Item individual de tarefa
 │   │   └── Toast.jsx     → Notificações toast
 │   └── services/
 │       └── TarefaService.js → Consumo da API REST (json-server)
 ├── .env                 → Variável de ambiente para a URL da API
 ├── index.html           → Entrada do app (título atualizado)
 └── README.md            → Documentação do projeto

---

## 🚀 Como Executar 
  •  Primeiramente certifique de ter criado e aberto uma pasta no VC Code ou IDE de preferencia     
```bash
git clone https://github.com/TempestaGui/trabalho_web
```
```bash
cd t1/agenda-mindful-react/back
npx json-server db.json --port 3000 //rodar o banco
````
```bash
cd t1/agenda-mindful-react 
```
```bash
npm install  
npm run dev  
# ou Utilize a extensão "Live Server" do VS Code || or use the "Live Server" extension in VS Code
````

---
