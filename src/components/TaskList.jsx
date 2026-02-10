import { TASK_STATUS } from "../constants"

const thStyle = {
    border: '1px solid #ccc',
    padding: 8,
    backgroundColor: '#f4f4f4',
    textAlign: 'left'
}

const tdStyle = {
    border: '1px solid #ccc',
    padding: 8
}

export default function TaskList({
    tasks,
    users,
    onStatusChange,
    onUserAssign,
    onEdit,
    onDelete
}) {
    if (!tasks.length) {
        return (
            <div>
                <h3>Listado de tareas</h3>
                <p>No hay tareas</p>
            </div>
        )
    }

    return (
        <div>
            <h3>Listado de tareas</h3>
            <table
                style={{
                    borderCollapse: 'collapse',
                    width: '100%',
                    maxWidth: 800
                }}
            >
                <thead>
                    <tr>
                        <th style={thStyle}>Título</th>
                        <th style={thStyle}>Descripción</th>
                        <th style={thStyle}>Estado</th>
                        <th style={thStyle}>Asignada a</th>
                        <th style={thStyle}>Editar</th>
                        <th style={thStyle}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.taskId}>
                            <td style={tdStyle}>
                                {task.title}
                            </td>

                            <td style={tdStyle}>
                                {task.description}
                            </td>

                            <td style={tdStyle}>
                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        onStatusChange({
                                            ...task,
                                            status: e.target.value
                                        })
                                    }
                                    style={{ padding: 4 }}
                                >
                                    {Object.keys(TASK_STATUS).map(status => (
                                        <option key={status} value={status}>
                                            {TASK_STATUS[status]}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td style={tdStyle}>
                                <select
                                    value={task.assignedTo}
                                    onChange={(e) =>
                                        onUserAssign({
                                            ...task,
                                            assignedTo: e.target.value
                                        })
                                    }
                                    style={{ padding: 4 }}
                                >
                                    <option value="">Seleccionar usuario</option>
                                    {users.map(user => (
                                        <option
                                            key={user.userId}
                                            value={user.userId}
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            <td style={tdStyle}>
                                <button
                                    onClick={() => onEdit(task)}
                                    style={{
                                        padding: '6px 12px',
                                        cursor: 'pointer',
                                        backgroundColor: '#3498db',
                                        color: '#fff',
                                        border: 'none'
                                    }}
                                >
                                    Editar
                                </button>
                            </td>

                            <td style={tdStyle}>
                                <button
                                    onClick={() => onDelete(task.taskId)}
                                    style={{
                                        padding: '6px 12px',
                                        cursor: 'pointer',
                                        backgroundColor: '#e74c3c',
                                        color: '#fff',
                                        border: 'none'
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
