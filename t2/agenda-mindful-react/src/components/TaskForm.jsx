import { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
  };

  return (
    <section className="form-container">
      <h2>Adicionar novas atividades</h2>
      <form onSubmit={handleSubmit} id="task-form">
        <div className="form-group">
          <label htmlFor="task-title">Título</label>
          <input type="text" id="task-title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="task-description">Descrição</label>
          <textarea id="task-description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-date">Data</label>
            <input type="date" id="task-date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="task-time">Horário</label>
            <input type="time" id="task-time" value={time} onChange={e => setTime(e.target.value)} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Atividade</button>
      </form>
    </section>
  );
}