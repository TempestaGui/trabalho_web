import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Toast from '../components/Toast';
import { useAuth } from '../contexts/AuthContext';
import * as TarefaService from '../services/TarefaService';

export default function HomePage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');

useEffect(() => {
  carregarTarefas();
}, []);

const carregarTarefas = async () => {
  const resultado = await TarefaService.buscarTodas();
  if (resultado.sucesso && Array.isArray(resultado.dados)) {
    setTasks(resultado.dados);
  } else {
    setTasks([]); // evita erro do .filter
    setMessage("Erro ao carregar tarefas");
  }
};

  const addTask = async (task) => {
    const resultado = await TarefaService.adicionar(task);
    if (resultado.sucesso) {
      setTasks([...tasks, resultado.dados]);
      setMessage("Atividade adicionada com sucesso!");
    } else {
      setMessage(resultado.mensagem);
    }
  };

  const updateTask = async (updatedTask) => {
    const resultado = await TarefaService.modificar(updatedTask.id, updatedTask);
    if (resultado.sucesso) {
      setTasks(tasks.map(t => t.id === updatedTask.id ? resultado.dados : t));
    } else {
      setMessage(resultado.mensagem);
    }
  };

  const deleteTask = async (id) => {
    const resultado = await TarefaService.remover(id);
    if (resultado.sucesso) {
      setTasks(tasks.filter(t => t.id !== id));
      setMessage("Tarefa excluída com sucesso!");
    } else {
      setMessage(resultado.mensagem);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Agenda Mindful</h1>
        <button id="logout-btn" className="btn btn-secondary" onClick={logout}>Sair</button>
      </header>
      <main className="container">
        <div className="welcome-section">
          <h2>Bem-vindo(a), {user}!</h2>
          <p>Organize suas atividades com tranquilidade</p>
        </div>
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} filter={filter} setFilter={setFilter} />
      </main>
      <footer><p>&copy; 2025 Agenda Mindful - organize seu dia a dia com tranquilidade</p></footer>
      {message && <Toast message={message} />}
    </div>
  );
}