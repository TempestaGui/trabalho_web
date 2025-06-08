export default function TaskItem({ task, updateTask, deleteTask }) {
  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir esta atividade?")) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-title">{task.title}</div>
      {task.description && <div className="task-description">{task.description}</div>}
      <div className="task-meta">
        <span className="task-date-time">{task.date} às {task.time}</span>
        <span className="task-status">{task.completed ? "Concluída" : "Pendente"}</span>
      </div>
      <div className="task-actions">
        <button className="task-action-btn complete" onClick={toggleComplete}>
          {task.completed ? "Desmarcar" : "Concluir"}
        </button>
        <button className="task-action-btn delete" onClick={handleDelete}>Excluir</button>
      </div>
    </div>
  );
}
