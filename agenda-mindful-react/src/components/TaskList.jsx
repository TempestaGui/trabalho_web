import TaskItem from './TaskItem';

export default function TaskList({ tasks, updateTask, deleteTask, filter, setFilter }) {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );

  return (
    <section className="tasks-container">
      <div className="tasks-header">
        <h2>Suas atividades</h2>
        <div className="filter-container">
          <select id="filter-tasks" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>
      </div>

      <div id="tasks-list" className="tasks-list">
        {sortedTasks.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma tarefa encontrada.</p>
          </div>
        ) : (
          sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </section>
  );
}
