document.addEventListener("DOMContentLoaded", () => {
  // Elementos principais
  const logoutBtn = document.getElementById("logout-btn");
  const agendaContent = document.getElementById("agenda-content");
  const user = localStorage.getItem("user");

  // Verificar login
  if (!user) {
    window.location.href = "/src/pages/login.html";
    return;
  }

  // Estado da aplicação
  let tasks = loadTasksFromLocalStorage();

  // Renderizar a página completa
  renderPage();

  // Funções principais
  function renderPage() {
    agendaContent.innerHTML = ''; // Limpa o conteúdo

    // Cria a estrutura da página
    const welcomeSection = document.createElement('div');
    welcomeSection.className = 'welcome-section';
    welcomeSection.innerHTML = `
      <h2>Bem-vindo(a), ${user}!</h2>
      <p>Organize suas atividades com tranquilidade</p>
    `;
    agendaContent.appendChild(welcomeSection);

    // Adiciona o formulário
    const formContainer = document.createElement('section');
    formContainer.className = 'form-container';
    formContainer.innerHTML = `
      <h2>Adicionar novas atividades</h2>
      <form id="task-form">
        <div class="form-group">
          <label for="task-title">Título</label>
          <input type="text" id="task-title" placeholder="Nome da atividade" required>
        </div>
        <div class="form-group">
          <label for="task-description">Descrição</label>
          <textarea id="task-description" placeholder="Detalhes da atividade"></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="task-date">Data</label>
            <input type="date" id="task-date" required>
          </div>
          <div class="form-group">
            <label for="task-time">Horário</label>
            <input type="time" id="task-time" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Adicionar Atividade</button>
      </form>
    `;
    agendaContent.appendChild(formContainer);

    // Adiciona a lista de tarefas
    const tasksContainer = document.createElement('section');
    tasksContainer.className = 'tasks-container';
    tasksContainer.innerHTML = `
      <div class="tasks-header">
        <h2>Suas atividades</h2>
        <div class="filter-container">
          <select id="filter-tasks">
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>
      </div>
      <div id="tasks-list" class="tasks-list"></div>
    `;
    agendaContent.appendChild(tasksContainer);

    // Footer
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <p>&copy; 2025 Agenda Mindful - organize seu dia a dia com tranquilidade</p>
    `;
    agendaContent.appendChild(footer);

    // Toast (para mensagens)
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast hidden';
    toast.innerHTML = '<span id="toast-message"></span>';
    document.body.appendChild(toast);

    // Event listeners
    setupEventListeners();
    renderTasks();
  }

  function setupEventListeners() {
    // Logout
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      localStorage.removeItem('tasks'); // Limpa também as tarefas se desejar
      window.location.href = "/src/pages/login.html";
    });

    // Formulário de tarefa
    const taskForm = document.getElementById('task-form');
    if (taskForm) {
      taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
      });
    }

    // Filtro de tarefas
    const filterTasks = document.getElementById('filter-tasks');
    if (filterTasks) {
      filterTasks.addEventListener('change', renderTasks);
    }
  }

  // Carrega tarefas do localStorage
  function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        return [];
      }
    }
    return [];
  }

  // Salva tarefas no localStorage
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Adiciona uma nova tarefa
  function addTask() {
    const titleInput = document.getElementById('task-title');
    const descriptionInput = document.getElementById('task-description');
    const dateInput = document.getElementById('task-date');
    const timeInput = document.getElementById('task-time');

    const newTask = {
      id: Date.now().toString(),
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      date: dateInput.value,
      time: timeInput.value,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();

    // Limpa o formulário
    taskForm.reset();

    // Atualiza a UI
    renderTasks();
    showToast('Atividade adicionada com sucesso!');
  }

  // Renderiza a lista de tarefas
  function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    const filterValue = document.getElementById('filter-tasks').value;

    let filteredTasks = tasks.filter(task => {
      if (filterValue === 'pending') return !task.completed;
      if (filterValue === 'completed') return task.completed;
      return true;
    });

    // Ordena por data/hora
    filteredTasks.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    // Limpa a lista
    tasksList.innerHTML = '';

    if (filteredTasks.length === 0) {
      tasksList.innerHTML = `
        <div class="empty-state">
          <p>Nenhuma tarefa adicionada ainda.</p>
          <p>Adicione uma nova atividade usando o formulário acima.</p>
        </div>
      `;
      return;
    }

    // Adiciona cada tarefa
    filteredTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      tasksList.appendChild(taskElement);
    });
  }

  // Cria elemento DOM para uma tarefa
  function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskElement.dataset.id = task.id;

    // Formata a data
    const taskDate = new Date(task.date);
    const formattedDate = taskDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    taskElement.innerHTML = `
      <div class="task-title">${task.title}</div>
      ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
      <div class="task-meta">
        <span class="task-date-time">${formattedDate} às ${task.time}</span>
        <span class="task-status">${task.completed ? 'Concluída' : 'Pendente'}</span>
      </div>
      <div class="task-actions">
        <button class="task-action-btn complete">${task.completed ? 'Desmarcar' : 'Concluir'}</button>
        <button class="task-action-btn delete">Excluir</button>
      </div>
    `;

    // Adiciona event listeners aos botões
    taskElement.querySelector('.complete').addEventListener('click', () => toggleTaskStatus(task.id));
    taskElement.querySelector('.delete').addEventListener('click', () => {
      if (confirm('Tem certeza que deseja excluir esta atividade?')) {
        deleteTask(task.id);
      }
    });

    return taskElement;
  }

  // Alterna status da tarefa (concluída/pendente)
  function toggleTaskStatus(taskId) {
    tasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    saveTasksToLocalStorage();
    renderTasks();

    const task = tasks.find(t => t.id === taskId);
    const status = task.completed ? 'concluída' : 'pendente';
    showToast(`Atividade marcada como ${status}!`);
  }

  // Remove uma tarefa
  function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTasks();
    showToast('Atividade removida com sucesso!');
  }

  // Mostra mensagem toast
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
});