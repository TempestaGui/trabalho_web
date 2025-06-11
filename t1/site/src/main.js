document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const user = localStorage.getItem("user");

  if (!user) {
    renderLogin();
  } else {
    renderHome();
  }

  function renderLogin() {
    app.innerHTML = `
      <header class="header"><h1>Agenda Mindful</h1></header>
      <main class="container">
        <section class="form-container">
          <h2>Login</h2>
          <p>Acesse sua conta para organizar suas atividades</p>
          <form id="loginForm" class="form-group">
            <div class="form-group">
              <label for="email">E-mail</label>
              <input type="email" id="email" placeholder="seu@email.com" required>
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <input type="password" id="password" placeholder="Sua senha" required>
            </div>
            <button type="submit" class="btn btn-primary">Entrar</button>
          </form>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Agenda Mindful - organize seu dia a dia com tranquilidade</p>
      </footer>
      <div id="toast" class="toast hidden"><span id="toast-message"></span></div>
    `;

    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email && password) {
        localStorage.setItem("user", email.split("@")[0]);
        showToast("Login realizado com sucesso!");
        setTimeout(renderHome, 1500);
      } else {
        showToast("Por favor, preencha todos os campos!");
      }
    });
  }

  function renderHome() {
    const user = localStorage.getItem("user");
    app.innerHTML = `
      <header class="header">
        <h1>Agenda Mindful</h1>
        <button id="logout-btn" class="btn btn-secondary">Sair</button>
      </header>
      <main class="container">
        <div id="agenda-content"></div>
      </main>
      <footer>
        <p>&copy; 2025 Agenda Mindful - organize seu dia a dia com tranquilidade</p>
      </footer>
      <div id="toast" class="toast hidden"><span id="toast-message"></span></div>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.clear();
      renderLogin();
    });

    renderAgenda(user);
  }

  function renderAgenda(user) {
    const agendaContent = document.getElementById("agenda-content");
    let tasks = loadTasks();

    agendaContent.innerHTML = `
      <div class="welcome-section">
        <h2>Bem-vindo(a), ${user}!</h2>
        <p>Organize suas atividades com tranquilidade</p>
      </div>
      <section class="form-container">
        <h2>Adicionar novas atividades</h2>
        <form id="task-form">
          <div class="form-group">
            <label for="task-title">Título</label>
            <input type="text" id="task-title" required />
          </div>
          <div class="form-group">
            <label for="task-description">Descrição</label>
            <textarea id="task-description"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="task-date">Data</label>
              <input type="date" id="task-date" required />
            </div>
            <div class="form-group">
              <label for="task-time">Horário</label>
              <input type="time" id="task-time" required />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Adicionar Atividade</button>
        </form>
      </section>
      <section class="tasks-container">
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
      </section>
    `;

    document.getElementById("task-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("task-title").value.trim();
      const description = document.getElementById("task-description").value.trim();
      const date = document.getElementById("task-date").value;
      const time = document.getElementById("task-time").value;

      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        date,
        time,
        completed: false,
        createdAt: new Date().toISOString(),
      };

      tasks.push(newTask);
      saveTasks(tasks);
      e.target.reset();
      renderTasks();
      showToast("Atividade adicionada com sucesso!");
    });

    document.getElementById("filter-tasks").addEventListener("change", renderTasks);
    renderTasks();

    function renderTasks() {
      const tasksList = document.getElementById("tasks-list");
      const filter = document.getElementById("filter-tasks").value;
      tasksList.innerHTML = "";

      const filtered = tasks.filter(task =>
        filter === "all" ||
        (filter === "pending" && !task.completed) ||
        (filter === "completed" && task.completed)
      );

      if (filtered.length === 0) {
        tasksList.innerHTML = `
          <div class="empty-state">
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        `;
        return;
      }

      filtered.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
      filtered.forEach(task => {
        const div = document.createElement("div");
        div.className = `task-item ${task.completed ? "completed" : ""}`;
        div.innerHTML = `
          <div class="task-title">${task.title}</div>
          ${task.description ? `<div class="task-description">${task.description}</div>` : ""}
          <div class="task-meta">
            <span class="task-date-time">${task.date} às ${task.time}</span>
            <span class="task-status">${task.completed ? "Concluída" : "Pendente"}</span>
          </div>
          <div class="task-actions">
            <button class="task-action-btn complete">${task.completed ? "Desmarcar" : "Concluir"}</button>
            <button class="task-action-btn delete">Excluir</button>
          </div>
        `;

        div.querySelector(".complete").addEventListener("click", () => {
          task.completed = !task.completed;
          saveTasks(tasks);
          renderTasks();
          showToast(`Tarefa marcada como ${task.completed ? "concluída" : "pendente"}`);
        });

        div.querySelector(".delete").addEventListener("click", () => {
          if (confirm("Tem certeza que deseja excluir esta atividade?")) {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks(tasks);
            renderTasks();
            showToast("Tarefa excluída com sucesso!");
          }
        });

        tasksList.appendChild(div);
      });
    }
  }

  function loadTasks() {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    toastMessage.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  }
});
