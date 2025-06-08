import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      setMessage('Login realizado com sucesso!');
      setTimeout(() => navigate('/'), 1500);
    } else {
      setMessage('Por favor, preencha todos os campos!');
    }
  };

  return (
    <div>
      <header className="header"><h1>Agenda Mindful</h1></header>
      <main className="container">
        <section className="form-container">
          <h2>Login</h2>
          <p>Acesse sua conta para organizar suas atividades</p>
          <form onSubmit={handleSubmit} className="form-group">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Entrar</button>
          </form>
        </section>
      </main>
      <footer><p>&copy; 2025 Agenda Mindful - organize seu dia a dia com tranquilidade</p></footer>
      {message && <Toast message={message} />}
    </div>
  );
}