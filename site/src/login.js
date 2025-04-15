document.addEventListener("DOMContentLoaded", () => {
    const loginRoot = document.getElementById("login-root");
    
    // Criar estrutura da página
    loginRoot.innerHTML = `
      <header class="header">
        <h1>Agenda Mindful</h1>
      </header>
  
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
  
      <div id="toast" class="toast hidden">
        <span id="toast-message"></span>
      </div>
    `;
  
    // Event listener para o formulário
    document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();
      
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
  
      // Validação simples (pode ser substituído por autenticação real)
      if (email && password) {
        // Simulação de login bem-sucedido
        localStorage.setItem("user", email.split("@")[0]); // Salva o nome do usuário
        showToast("Login realizado com sucesso!");
        
        // Redireciona após 1.5 segundos
        setTimeout(() => {
          window.location.href = "home.html";
        }, 1500);
      } else {
        showToast("Por favor, preencha todos os campos!");
      }
    });
  
    // Função para mostrar toast (reutilizada da home)
    function showToast(message) {
      const toast = document.getElementById("toast");
      const toastMessage = document.getElementById("toast-message");
      toastMessage.textContent = message;
      toast.classList.remove("hidden");
  
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    }
  });